/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
export function getFileDirPath(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).dir;
}
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileName(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).name;
}
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileNameAndExtension(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).base;
}
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
export function getFileDir(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.dirname(filePath);
}
/**
 * Determines the destination of an artifact given the area, the core language, the input name of artifact, cwd and path of the bounded context
 * 
 * @param {string} area Area of the artifact (read, events, domain, concepts)
 * @param {string} language The core language of the bounded context
 * @param {string} name The inputted name of the artifact (dots, '.', used to derive feature/module path )
 * @param {string} cwd The current working directory
 * @param {string} boundedContextPath The path of the bounded-context.json configuration
 * @param {any} dolittleConfig A configuration object that tells us what folder an artifact should go into depending on the area
 * 
 * @returns {{destination: string, name: string}} The destination path and the actual name of the artifact
 */
export function determineDestination(area, language, name, cwd, boundedContextPath, dolittleConfig){
    const path = require('path');
    let config = dolittleConfig[language];
    if (config === undefined || config === null)
        throw `No configuration for language ${language}`;
    const areaName = config[area];
    if (areaName === undefined || areaName === null)
        throw `No configuration for area ${area} for language ${language}`;
    const boundedContextRoot = path.dirname(boundedContextPath);
    const regExp = new RegExp(
        `(${escapeRegex(boundedContextRoot)})` + // Match first part of path (root of bounded-context) 
        `(?:${escapeRegex(path.sep)}[^${escapeRegex(path.sep)}]+)?` + // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
        `(${escapeRegex(path.sep)}?.*)` // Match all the segments after the area
        
    );
    const newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');

    let splittedName = name.split('.');
    const featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return {destination: newDestination + featurePath, name: splittedName[splittedName.length - 1]};
}

function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * @type {string[]} List of the artifact areas
 */
export const areas = [
    'concepts',
    'domain',
    'events',
    'read'
];