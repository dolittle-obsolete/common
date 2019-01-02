/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerPlate } from "../boilerPlates/BoilerPlate";
import { Dependency } from "../dependencies/Dependency";
import { BoilerPlatesManager } from "../boilerPlates/BoilerPlatesManager";
import { Guid } from "../Guid";

export const applicationBoilerplateType = 'application';

/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager {
    #boilerPlatesManager;
    #logger;

    /**
     *Creates an instance of ApplicationsManager.
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {import('winston').Logger} logger
     * @memberof ApplicationsManager
     */
    constructor(boilerPlatesManager, logger) {
        this.#boilerPlatesManager = boilerPlatesManager;
        this.#logger = logger;
    }
    /**
     * Gets all the dependencies for an application of a given language
     *
     * @export
     * @param {string} language
     * @returns {Dependency[]}
     */
    getDependencies(language) {
        let boilerplate = this.boilerPlateByLanguage(language);
        return boilerplate.dependencies;
    }
    /**
     * Retrieves the boilerplate.json configuration for application with the given language
     * @param {string} language 
     * @return {BoilerPlate} The application {Boilerplate} with of the given language
     */
    boilerPlateByLanguage(language) {
        let boilerPlates = this.#boilerPlatesManager.boilerPlatesByLanguageAndType(language, applicationBoilerplateType);
        if (boilerPlates === null || boilerPlates.length === 0) {
            this.#logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${applicationBoilerplateType}`);
            throw new Error('Could not find boilerplate for given language and type');
        }
        if (boilerPlates.length > 1) {
            this.#logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${applicationBoilerplateType}`);
            throw new Error('Found multiple boilerplates');
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
    createApplication(context, destinationPath) {
        let boilerPlate = this.#boilerPlatesManager.boilerPlatesByType(applicationBoilerplateType)[0];

        if (boilerPlate === undefined) {
            this.#logger.error(`No boilerplate found with type '${applicationBoilerplateType}'`);
            throw new Error('Missing boilerplate');
        }

        this.#boilerPlatesManager.createInstance(boilerPlate, destinationPath, context);
}


}