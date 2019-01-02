/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from "./Dependency";
import { Folders } from "../Folders";

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
     * @param {*} dolittleConfig
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
     * @param {Dependency} dependency 
     * @param {string} location 
     * @param {string} language
     */
    discover(dependency, location, language) {
        if (dependency.discoverType === 'namespace') {
            return createNamespace(dependency, location);
        }
        if (dependency.discoverType === )
        else if (dependency.discoverType === 'multipleFiles') {
            return discoverMultipleFiles(dependency, location, language);
        }

        throw new Error(`Cannot handle discoveryType '${dependency.discoverType}'`);
    }

    /**
     * Discovers multiple files
     * @param {Dependency} dependency
     * @param {string} location
     * @param {string} language
     * @returns {string[] | {value: string, namespace: string}[]} 
     */
    #discoverMultipleFiles(dependency, location, language) {
    
        let filePaths = [];
        if (dependency.fromArea === undefined) {
            filePaths = this.#folders.searchRecursiveRegex(location, dependency.fileMatch);
        }
        else {
            const folders = this.#folders.getNearestDirsSearchingUpwards(location, new RegExp(this.#dolittleConfig[language][dependency.fromArea]));
            folders.forEach(folder => filePaths.push(...this.#folders.searchRecursiveRegex(folder, dependency.fileMatch)));
        }
        let results = [];
        if (dependency.contentMatch === undefined) { 
            results = filePaths;
        }
        else {
            filePaths.forEach(filePath => {
                let content = this.#fileSystem.readFileSync(filePath, 'utf8');
                let theMatch = content.match(dependency.contentMatch);
                if (theMatch !== null && theMatch.length > 0) {
                    let namespace = '';
                    if (dependency.withNamespace)
                        namespace = createNamespace(dependency, getFileDirPath(filePath));

                    let choice = dependency.withNamespace?  {value: theMatch[1], namespace: namespace}
                        : theMatch[1];
                    results.push(choice);
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