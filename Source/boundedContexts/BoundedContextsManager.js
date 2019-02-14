/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { BoilerPlate } from '../boilerPlates/BoilerPlate';
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';
import { Folders } from '../Folders';
import { boundedContextFromJson } from './BoundedContext';
import path from 'path';
import { groupBy } from '../helpers';

export const boundedContextBoilerplateType = 'boundedContext';
export const boundedContextFileName = 'bounded-context.json';
/**
 * 
 *
 * @export
 * @class BoundedContextsManager
 */
export class BoundedContextsManager {
    #boilerPlatesManager;
    #folders;
    #fileSystem;
    #logger;
    /**
     *Creates an instance of BoundedContextsManager.
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof BoundedContextsManager
     */
    constructor(boilerPlatesManager, folders, fileSystem, logger) {
        this.#boilerPlatesManager = boilerPlatesManager;
        this.#folders = folders;
        this.#fileSystem = fileSystem;
        this.#logger = logger;
    }

    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext | null} the bounded context
     */
    getNearestBoundedContextConfig(startPath) {
        let regex =  new RegExp('\\b'+boundedContextFileName+'\\b');
        const boundedContextConfigPath = this.#folders.getNearestFileSearchingUpwards(startPath, regex);
        if (boundedContextConfigPath === undefined || boundedContextConfigPath === '') return null;
        this.#logger.info(`Found bounded context configuration at path '${boundedContextConfigPath}'`);

        let boundedContextObj = JSON.parse(this.#fileSystem.readFileSync(boundedContextConfigPath, 'utf8'));
        let boundedContext = boundedContextFromJson(boundedContextObj, boundedContextConfigPath);
        
        return boundedContext;
    }
    /**
     * Check if a bounded context configuration can be found in the given directory.
     * @param {string} folder The directory path to search
     * @returns {boolean} Whether or not the bounded context configuration was found
     */
    hasBoundedContext(folder) {
        const filePath = path.join(folder, boundedContextFileName);
        return this.#fileSystem.existsSync(filePath);
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
        return boilerplate? boilerplate.dependencies : [];
    }
    /**
     * Create interaction layer dependencies used for prompting the user for interaction layers
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @memberof BoundedContextsManager
     */
    createInteractionDependencies(language = undefined, boilerplateName = undefined) {
        let interactionLayerTypes = groupBy('target')(this.getInteractionLayers(language, boilerplateName));
        return Object.keys(interactionLayerTypes)
            .map(target => new Dependency(
                `Choose ${target} interaction layer`,
                `interaction${target}`,
                'userInput',
                undefined,
                'chooseOne',
                interactionLayers.map(_ => _.name),
                `Choose ${target} interaction layer`,
                'None'
            ));
    }
    /**
     * Gets the interaction adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @memberof BoundedContextsManager
     */
    getInteractionLayers(language = undefined, boilerplateName = undefined) {
        return this.#boilerPlatesManager.getAdornments(boundedContextBoilerplateType, language, boilerplateName).filter(_ => _.type === 'interaction');
    }
    /**
     * Retrieves the boilerplate.json configuration for bounded context with the given language
     * @param {string} language 
     * @return {BoilerPlate | null} The bounded context {Boilerplate} with of the given language
     */
    boilerPlateByLanguage(language) {
        let boilerPlates = this.#boilerPlatesManager.boilerPlatesByLanguageAndType(language, boundedContextBoilerplateType);
        if (boilerPlates === null || boilerPlates.length === 0) {
            this.#logger.error(`Could not find a boilerplate configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
            return null;
        }
        if (boilerPlates.length > 1) {
            this.#logger.error(`Found more than one boilerplate configuration for language: ${language} and type: ${boundedContextBoilerplateType}`);
            return null;
        }
        return boilerPlates[0];
    }
    /**
     * Creates a dolittle bounded context
     *
     * @param {any} context The template context
     * @param {string} language The core language of the bounded context
     * @param {string} destinationPath The absolute path of the destination of the bounded context
     * @returns {boolean} Whether or not the bounded context was created successfully
     */
    createBoundedContext(context, language, destinationPath) {
        let boilerPlate = this.boilerPlateByLanguage(language);
        if (!boilerPlate) return false;
        const boundedContextPath = path.join(destinationPath, context.name);
        
        this.#boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, context);
        return true;
    }
    
}