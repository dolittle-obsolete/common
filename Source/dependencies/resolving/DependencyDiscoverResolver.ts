/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir, IFolders } from "@dolittle/tooling.common.files";
import {IFileSystem} from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { MissingDestinationPath, MissingCoreLanguage, namespaceDiscoverType, multipleFilesDiscoverType, IDependencyDiscoverResolver, MissingField, DependencyDiscoverResult, IDiscoverDependency } from '../index';

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

    async resolve(dependency: IDiscoverDependency, startLocation: string, coreLanguage: string, dolittleConfig: any = this._dolittleConfig ): Promise<DependencyDiscoverResult> {
        if (!startLocation) throw new MissingDestinationPath();
        if (!coreLanguage) throw new MissingCoreLanguage();
        
        if (dependency.discoverType === namespaceDiscoverType) {
            let discoverResult = await this.createNamespace(dependency, startLocation);
            return discoverResult;
        }
        else if (dependency.discoverType === multipleFilesDiscoverType) {
            let discoverResult = await this.discoverMultipleFiles(dependency, startLocation, coreLanguage, dolittleConfig);
            return discoverResult;
        }

        throw new Error(`Cannot handle discoveryType '${dependency.discoverType}'`);
    }

    private async discoverMultipleFiles(dependency: IDiscoverDependency, location: string, language: string, dolittleConfig: any): Promise<string[] | { value: string, namespace: string }[]> {
        let filePaths: string[] = [];
        if (dependency.fromArea === undefined) {
            if (!dependency.fileMatch) throw new MissingField(dependency, 'fileMatch');
            filePaths = await this._folders.getFilesRecursively(location, dependency.fileMatch);
        }
        else {
            const folders = await this._folders.getNearestDirectoriesSearchingUpwards(location, new RegExp(dolittleConfig[language][dependency.fromArea]));
            if (!dependency.fileMatch) throw new MissingField(dependency, 'fileMatch');
            let files = await Promise.all(folders.map(folder => this._folders.getFilesRecursively(folder, <RegExp>dependency.fileMatch)));
            files.forEach(_ => filePaths.push(..._));
        }
        let results: any[] = [];

        if (dependency.contentMatch === undefined) { 
            for (let filePath of filePaths) {
                let namespace = '';
                    if (dependency.withNamespace)
                        namespace = await this.createNamespace(dependency, getFileDirPath(filePath));

                    let item = dependency.withNamespace?  {value: filePath, namespace: namespace}
                        : filePath;
                    results.push(item);
            }
        }
        else {
            for (let filePath of filePaths) {
                let content = await this._fileSystem.readFile(filePath);
                if (!dependency.contentMatch) throw new MissingField(dependency, 'contentMatch');
                let theMatch = content.match(dependency.contentMatch);
                if (theMatch !== null && theMatch.length > 0) {
                    let namespace = '';
                    if (dependency.withNamespace)
                        namespace = await this.createNamespace(dependency, getFileDirPath(filePath));

                    let item = dependency.withNamespace?  {value: theMatch[1], namespace: namespace}
                        : theMatch[1];
                    results.push(item);
                }
            }
        }
        return results;
    }

    private async createNamespace(dependency: IDiscoverDependency, location: string) {
        let milestoneRegexp = dependency.milestone;
        if (!milestoneRegexp) throw new MissingField(dependency, 'milestone');
        const milestonePaths = await this._folders.getNearestFilesSearchingUpwards(location, milestoneRegexp);
        if (milestonePaths.length === 0) {
            this._logger.warn('Could not discover the namespace');
            return '';
        }
        const milestoneFileName = getFileName(milestonePaths[0]);

        let namespaceSegments = [];
        let segmentPath = location;
        let segment = getFileNameAndExtension(segmentPath);
        
        while ((await this._folders.getFiles(segmentPath, milestoneRegexp)).length === 0) {
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