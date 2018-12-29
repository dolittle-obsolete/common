/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './globals';
import { Guid } from './Guid';

/**
 * Gets all the dependencies for an application of a given language
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
 * Retrieves the boilerplate.json configuration for application with the given language
 * @param {string} language 
 * @return {import('../Source/boilerPlates/BoilerPlate').BoilerPlate} The application {Boilerplate} with of the given language
 */
export function boilerPlateByLanguage(language) {
    let boilerPlates = globals.boilerPlatesManager.boilerPlatesByLanguageAndType(language, applicationBoilerplateType);
    if (boilerPlates === null || boilerPlates.length === 0) {
        this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${applicationBoilerplateType}`);
        throw 'Could not find boilerplate for given language and type';
    }
    if (boilerPlates.length > 1) {
        this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${applicationBoilerplateType}`);
        throw 'Found multiple boilerplates';
    }
    return boilerPlates[0];
}
/**
 * Creates a dolittle application based on the boilerplates provided in your .dolittle folder in your user's root directory
 *
 * @param {any} context The template context 
 * @param {string} destinationPath The absolute path of the destination of the application
 * @returns {void}
 */
export function createApplication(context, destinationPath) {
    globals.logger.info(`Creating application with name '${context.name}'`);
    
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByType('application')[0];

    if (boilerPlate === undefined) {
        globals.logger.error('No boilerplate found with type \'application\'');
        throw 'Missing boilerplate';
    }
    context.id = Guid.create();

    globals.boilerPlatesManager.createInstance(boilerPlate, destinationPath, context);
}

export const applicationBoilerplateType = 'application';