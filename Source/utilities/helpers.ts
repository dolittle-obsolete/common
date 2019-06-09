/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');

/**
 * Stolen from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 * Returns a function that returns a function that groups an array of object by a property name, key 
 */
export const groupBy = (key: string) => (array: any[]) =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
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
export function determineDestination(area: string, language: string, name: string, cwd: string, boundedContextPath: string, dolittleConfig: any): { destination: string; name: string; }{
    let config = dolittleConfig[language];
    if (config === undefined || config === null)
        throw new Error(`No configuration for language ${language}`);
    const areaName = config[area];
    if (areaName === undefined || areaName === null)
        throw new Error(`No configuration for area ${area} for language ${language}`);
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

function escapeRegex(s: string): string {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * @type {string[]} List of the artifact areas
 */
export const areas: string[] = [
    'concepts',
    'domain',
    'events',
    'read'
];