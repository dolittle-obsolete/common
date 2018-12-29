/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from '../globals';
import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir } from '../helpers';

/**
 * 
 * @param {import('./Dependency').Dependency} dependency 
 * @param {string} location 
 * @param {string} language
 */
export function discover(dependency, location, language) {
    if (dependency.discoverType === 'namespace') {
        return createNamespace(dependency, location);
    } 
    else if (dependency.discoverType === 'multipleFiles') {
        return discoverMultipleFiles(dependency, location, language);
    }

    throw `Cannot handle discoveryType '${dependency.discoverType}'`;
}

/**
 * 
 * @param {import('./Dependency').Dependency} dependency
 * @param {string} location
 * @param {string} language
 * @returns {string[] | {value: string, namespace: string}[]} 
 */
function discoverMultipleFiles(dependency, location, language) {
    
    let filePaths = [];
    if (dependency.fromArea === undefined)
        filePaths = globals.folders.searchRecursiveRegex(location, dependency.fileMatch);
    else {
        const folders = globals.folders.getNearestDirsSearchingUpwards(location, new RegExp(globals.dolittleConfig[language][dependency.fromArea]));
        folders.forEach(folder => filePaths.push(...globals.folders.searchRecursiveRegex(folder, dependency.fileMatch)));
    }
    let results = [];
    if (dependency.contentMatch === undefined) { 
        results = filePaths;
    }
    else {
        filePaths.forEach(filePath => {
            let content = globals.fileSystem.readFileSync(filePath, 'utf8');
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
 * @param {import('./Dependency').Dependency} dependency 
 * @param {string} location
 * @returns {string} 
 */
function createNamespace(dependency, location) {
    let milestoneRegexp = dependency.milestone;
    const milestonePath = globals.folders.getNearestFileSearchingUpwards(location, milestoneRegexp);
    if (milestonePath === null || milestonePath === '') {
        globals.logger.warn('Could not discover the namespace');
        return '';
    }
    const milestoneFileName = getFileName(milestonePath);

    let namespaceSegments = [];
    let segmentPath = location;
    let segment = getFileNameAndExtension(segmentPath);
    
    while (globals.folders.searchFolderRegex(segmentPath, milestoneRegexp).length === 0) {
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