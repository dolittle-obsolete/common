import { Dependency } from '../dependencies/Dependency';
import { BoilerPlate } from '../boilerPlates/BoilerPlate';
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');


export const boundedContextBoilerplateType = 'boundedContext';

/**
 * 
 *
 * @export
 * @class BoundedContextsManager
 */
export class BoundedContextsManager {
    #boilerPlatesManager;
    #logger;
    /**
     *Creates an instance of BoundedContextsManager.
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {import('winston').Logger} logger
     * @memberof BoundedContextsManager
     */
    constructor(boilerPlatesManager, logger) {
        this.#boilerPlatesManager = boilerPlatesManager;
        this.#logger = logger;
    }
        /**
         * Gets all the dependencies for a bounded context of a given language
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
         * Retrieves the boilerplate.json configuration for bounded context with the given language
         * @param {string} language 
         * @return {BoilerPlate} The bounded context {Boilerplate} with of the given language
         */
        boilerPlateByLanguage(language) {
            let boilerPlates = this.#boilerPlatesManager.boilerPlatesByLanguageAndType(language, boundedContextBoilerplateType);
            if (boilerPlates === null || boilerPlates.length === 0) {
                this.#logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
                throw new Error('Could not find boilerplate for given language and type');
            }
            if (boilerPlates.length > 1) {
                this.#logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
                throw new Error('Found multiple boilerplates');
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
        createBoundedContext(context, language, destinationPath) {
            let boilerPlate = this.boilerPlateByLanguage(language);
            
            const boundedContextPath = path.join(destinationPath, context.name);
            
            this.#boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, context);
        }
    
}