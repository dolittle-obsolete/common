/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from "./Dependency";
import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir } from "@dolittle/tooling.common.utilities/helpers";
import * as FsExtra from 'fs-extra';
import {Logger} from 'winston';
import { IDependenciesManager } from "./IDependenciesManager";
import { Folders } from "@dolittle/tooling.common.utilities";
/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export class DependenciesManager implements IDependenciesManager {
    private _folders: Folders;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;
    private _dolittleConfig: any;
    /**
     *Creates an instance of DependenciesManager.
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {any} dolittleConfig Pre-loaded dolittle configuration file
     * @param {Logger} logger
     * @memberof DependenciesManager
     */
    constructor(folders: Folders, fileSystem: typeof FsExtra, dolittleConfig: any, logger: Logger) {
        this._folders = folders;
        this._fileSystem = fileSystem;
        this._dolittleConfig = dolittleConfig;
        this._logger = logger;
    }

    /**
     * Discovers a dependency
     * @param {Dependency} dependency The dependency 
     * @param {string} location The path to start searching from
     * @param {string} language The core language
     * @param {*} dolittleConfig
     */
    discover(dependency: Dependency, startLocation: string, language: string, dolittleConfig: any = this._dolittleConfig ): string | string[] | {value: string, namespace: string}[] {
        if (dependency.discoverType === 'namespace') {
            return this.createNamespace(dependency, startLocation);
        }
        else if (dependency.discoverType === 'multipleFiles') {
            return this.discoverMultipleFiles(dependency, startLocation, language, dolittleConfig);
        }

        throw new Error(`Cannot handle discoveryType '${dependency.discoverType}'`);
    }

    /**
     * Discovers multiple files
     * @param {Dependency} dependency The dependency
     * @param {string} location The path to start searching from
     * @param {string} language The core language
     * @param {*} dolittleConfig 
     * @returns {string[] | {value: string, namespace: string}[]} returns a list of 
     */
    private discoverMultipleFiles(dependency: Dependency, location: string, language: string, dolittleConfig: any): string[] | { value: string, namespace: string }[] {
        let filePaths: string[] = [];
        if (dependency.fromArea === undefined) {
            filePaths = this._folders.searchRecursiveRegex(location, dependency.fileMatch);
        }
        else {
            const folders = this._folders.getNearestDirsSearchingUpwards(location, new RegExp(dolittleConfig[language][dependency.fromArea]));
            folders.forEach(folder => filePaths.push(...this._folders.searchRecursiveRegex(folder, dependency.fileMatch)));
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

    /**
     * Creates the namespace
     * @param {Dependency} dependency 
     * @param {string} location
     * @returns {string} 
     */
    private createNamespace(dependency: Dependency, location: string): string {
        let milestoneRegexp = dependency.milestone;
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