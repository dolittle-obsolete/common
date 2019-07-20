/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir, IFolders } from "@dolittle/tooling.common.files";
import {IFileSystem} from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { MissingDestinationPath, MissingCoreLanguage, namespaceDiscoverType, multipleFilesDiscoverType, IDependencyDiscoverResolver, DependencyMissingField, DependencyDiscoverResult, IDiscoverDependency } from '../index';

/**
 * Represents an implementation of {IDependencyDiscoverResolver} for resolving a dependency's 'discover' field
 *
 * @export
 * @class DependencyDiscoverResolver
 * @implements {IDependencyDiscoverResolver}
 */
export class DependencyDiscoverResolver implements IDependencyDiscoverResolver {
    
    /**
     * Instantiates an instance of {DependencyDiscoverResolver}.
     * @param {IFolders} _folders
     * @param {typeof FsExtra} _fileSystem
     * @param {*} _dolittleConfig
     * @param {ILoggers} _logger
     */
    constructor(private _folders: IFolders, private _fileSystem: IFileSystem, private _dolittleConfig: any, private _logger: ILoggers) {}

    resolve(dependency: IDiscoverDependency, startLocation: string, coreLanguage: string, dolittleConfig: any = this._dolittleConfig ): DependencyDiscoverResult {
        if (!startLocation) throw new MissingDestinationPath();
        if (!coreLanguage) throw new MissingCoreLanguage();
        if (dependency.discoverType === namespaceDiscoverType) {
            return this.createNamespace(dependency, startLocation);
        }
        else if (dependency.discoverType === multipleFilesDiscoverType) {
            return this.discoverMultipleFiles(dependency, startLocation, coreLanguage, dolittleConfig);
        }

        throw new Error(`Cannot handle discoveryType '${dependency.discoverType}'`);
    }

    private discoverMultipleFiles(dependency: IDiscoverDependency, location: string, language: string, dolittleConfig: any): string[] | { value: string, namespace: string }[] {
        let filePaths: string[] = [];
        if (dependency.fromArea === undefined) {
            if (!dependency.fileMatch) throw new DependencyMissingField(dependency, 'fileMatch');
            filePaths = this._folders.searchRecursiveRegex(location, dependency.fileMatch);
        }
        else {
            const folders = this._folders.getNearestDirsSearchingUpwards(location, new RegExp(dolittleConfig[language][dependency.fromArea]));
            if (!dependency.fileMatch) throw new DependencyMissingField(dependency, 'fileMatch');
            folders.forEach(folder => filePaths.push(...this._folders.searchRecursiveRegex(folder, <RegExp>dependency.fileMatch)));
        }
        let results: any[] = [];

        if (dependency.contentMatch === undefined) { 
            filePaths.forEach(filePath => {
                let namespace = '';
                    if (dependency.withNamespace)
                        namespace = this.createNamespace(dependency, getFileDirPath(filePath));

                    let item = dependency.withNamespace?  {value: filePath, namespace: namespace}
                        : filePath;
                    results.push(item);
            });
        }
        else {
            filePaths.forEach(filePath => {
                let content = this._fileSystem.readFileSync(filePath, 'utf8');
                if (!dependency.contentMatch) throw new DependencyMissingField(dependency, 'contentMatch');
                let theMatch = content.match(dependency.contentMatch);
                if (theMatch !== null && theMatch.length > 0) {
                    let namespace = '';
                    if (dependency.withNamespace)
                        namespace = this.createNamespace(dependency, getFileDirPath(filePath));

                    let item = dependency.withNamespace?  {value: theMatch[1], namespace: namespace}
                        : theMatch[1];
                    results.push(item);
                }
            });
        }
        return results;
    }

    private createNamespace(dependency: IDiscoverDependency, location: string): string {
        let milestoneRegexp = dependency.milestone;
        if (!milestoneRegexp) throw new DependencyMissingField(dependency, 'milestone');
        const milestonePath = this._folders.getNearestFileSearchingUpwards(location, milestoneRegexp);
        if (milestonePath === null || milestonePath === '') {
            this._logger.warn('Could not discover the namespace');
            return '';
        }
        const milestoneFileName = getFileName(milestonePath);

        let namespaceSegments = [];
        let segmentPath = location;
        let segment = getFileNameAndExtension(segmentPath);
        
        while (this._folders.searchFolderRegex(segmentPath, milestoneRegexp).length === 0) {
            namespaceSegments.push(segment);
            segmentPath = getFileDir(segmentPath);
            segment = getFileName(segmentPath);
        } 
        namespaceSegments = namespaceSegments.reverse();
        
        let namespace = milestoneFileName;
        namespaceSegments.forEach(element => {
            namespace += '.' + element;
        });

        return namespace;
    }
}