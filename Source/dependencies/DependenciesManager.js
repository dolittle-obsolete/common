/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from "./Dependency";
import { Folders } from "../Folders";
import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir } from "../helpers";

/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export class DependenciesManager {
    #folders;
    #fileSystem;
    #dolittleConfig;
    #logger;
    /**
     *Creates an instance of DependenciesManager.
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {*} dolittleConfig Pre-loaded dolittle configuration file
     * @param {import('winston').Logger} logger
     * @memberof DependenciesManager
     */
    constructor(folders, fileSystem, dolittleConfig, logger) {
        this.#folders = folders;
        this.#fileSystem = fileSystem;
        this.#dolittleConfig = dolittleConfig;
        this.#logger = logger;
    }

    /**
     * Discovers a dependency
     * @param {Dependency} dependency The dependency 
     * @param {string} location The path to start searching from
     * @param {string} language The core language
     * @param {*} dolittleConfig
     */
    discover(dependency, location, language, dolittleConfig = this.#dolittleConfig ) {
        if (dependency.discoverType === 'namespace') {
            return this.#createNamespace(dependency, location, dolittleConfig);
        }
        else if (dependency.discoverType === 'multipleFiles') {
            return this.#discoverMultipleFiles(dependency, location, language, dolittleConfig);
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
    #discoverMultipleFiles(dependency, location, language, dolittleConfig) {
    
        let filePaths = [];
        if (dependency.fromArea === undefined) {
            filePaths = this.#folders.searchRecursiveRegex(location, dependency.fileMatch);
        }
        else {
            const folders = this.#folders.getNearestDirsSearchingUpwards(location, new RegExp(dolittleConfig[language][dependency.fromArea]));
            folders.forEach(folder => filePaths.push(...this.#folders.searchRecursiveRegex(folder, dependency.fileMatch)));
        }
        let results = [];
        if (dependency.contentMatch === undefined) { 
            filePaths.forEach(filePath => {
                let namespace = '';
                    if (dependency.withNamespace)
                        namespace = this.#createNamespace(dependency, getFileDirPath(filePath));

                    let item = dependency.withNamespace?  {value: filePath, namespace: namespace}
                        : filePath;
                    results.push(item);
            });
        }
        else {
            filePaths.forEach(filePath => {
                let content = this.#fileSystem.readFileSync(filePath, 'utf8');
                let theMatch = content.match(dependency.contentMatch);
                if (theMatch !== null && theMatch.length > 0) {
                    let namespace = '';
                    if (dependency.withNamespace)
                        namespace = this.#createNamespace(dependency, getFileDirPath(filePath));

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
    #createNamespace(dependency, location) {
        let milestoneRegexp = dependency.milestone;
        const milestonePath = this.#folders.getNearestFileSearchingUpwards(location, milestoneRegexp);
        if (milestonePath === null || milestonePath === '') {
            this.#logger.warn('Could not discover the namespace');
            return '';
        }
        const milestoneFileName = getFileName(milestonePath);

        let namespaceSegments = [];
        let segmentPath = location;
        let segment = getFileNameAndExtension(segmentPath);
        
        while (this.#folders.searchFolderRegex(segmentPath, milestoneRegexp).length === 0) {
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