/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './globals';
import { Guid } from './Guid';

const path = require('path');

/**
 * Gets all the dependencies for a bounded context of a given language
 *
 * @export
 * @param {string} language
 * @returns {import('../Source/dependencies/Dependency').Dependency[]}
 */
export function getDependencies(language) {
    let boilerplate = boilerPlateByLanguage(language);
    return boilerplate.dependencies;
}
/**
 * Retrieves the boilerplate.json configuration for bounded context with the given language
 * @param {string} language 
 * @return {import('../Source/boilerPlates/BoilerPlate').BoilerPlate} The bounded context {Boilerplate} with of the given language
 */
export function boilerPlateByLanguage(language) {
    let boilerPlates = globals.boilerPlatesManager.boilerPlatesByLanguageAndType(language, boundedContextBoilerplateType);
    if (boilerPlates === null || boilerPlates.length === 0) {
        this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
        throw 'Could not find boilerplate for given language and type';
    }
    if (boilerPlates.length > 1) {
        this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
        throw 'Found multiple boilerplates';
    }
    return boilerPlates[0];
}
/**
 * Creates a dolittle bounded context based on the boilerplates provided in your .dolittle folder in your user's root directory
 *
 * @param {any} context The template context
 * @param {string} language The core language of the bounded context
 * @param {string} destinationPath The absolute path of the destination of the bounded context
 * @returns {void}
 */
export function createBoundedContext(context, language, destinationPath) {
    this._logger.info(`Creating bounded context with name '${context.name}'`);
    
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByLanguageAndType(language, boundedContextBoilerplateType)[0];
    
    if (boilerPlate === undefined) {
        globals.logger.error(`No boilerplate found with language '${language}' and type '${boundedContextBoilerplateType}'`);
        throw 'Missing boilerplate';
    }
    context.id = Guid.create();
    
    const boundedContextPath = path.join(destinationPath, context.name);
    
    globals.boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, context);
}


export const boundedContextBoilerplateType = 'boundedContext';
