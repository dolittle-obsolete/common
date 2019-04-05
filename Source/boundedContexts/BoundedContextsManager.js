/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { Boilerplate } from '../boilerplates/Boilerplate';
import { BoilerplatesManager } from '../boilerplates/BoilerplatesManager';
import { Folders } from '../Folders';
import { boundedContextFromJson, BoundedContext } from './BoundedContext';
import path from 'path';
import { groupBy } from '../helpers';
import { coreFromJson } from './Core';
import { InteractionLayer } from './InteractionLayer';
import { resourcesFromJson } from './Resources';
import { ApplicationsManager } from '../applications/ApplicationsManager';

export const boundedContextBoilerplateType = 'boundedContext';
export const boundedContextFileName = 'bounded-context.json';
/**
 * 
 *
 * @export
 * @class BoundedContextsManager
 */
export class BoundedContextsManager {
    #_boilerplatesManager;
    #_applicationsManager;
    #_folders;
    #_fileSystem;
    #_logger;
    /**
     *Creates an instance of BoundedContextsManager.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {ApplicationsManager} applicationsManager
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof BoundedContextsManager
     */
    constructor(boilerplatesManager, applicationsManager, folders, fileSystem, logger) {
        this.#_boilerplatesManager = boilerplatesManager;
        this.#_applicationsManager = applicationsManager;
        this.#_folders = folders;
        this.#_fileSystem = fileSystem;
        this.#_logger = logger;
    }
    /**
     * 
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof BoundedContextsManager
     */
    get boilerplatesManager() {
        return this.#_boilerplatesManager;
    }
    /**
     * @type {ApplicationsManager}
     * @readonly
     * @memberof BoundedContextsManager
     */
    get applicationsManager() {
        return this.#_applicationsManager;
    }
    /**
     * 
     * @type {Folders}
     * @readonly
     * @memberof BoundedContextsManager
     */
    get folders() {
        return this.#_folders;
    }
    /**
     * 
     * @type {import('fs-extra')}
     * @readonly
     * @memberof BoundedContextsManager
     */
    get fileSystem() {
        return this.#_fileSystem;
    }
    /**
     * 
     * @type {import('winston').Logger}
     * @readonly
     * @memberof BoundedContextsManager
     */
    get logger() {
        return this.#_logger;
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext | null} the bounded context
     */
    getNearestBoundedContextConfig(startPath) {
        let regex =  new RegExp('\\b'+boundedContextFileName+'\\b');
        const boundedContextConfigPath = this.folders.getNearestFileSearchingUpwards(startPath, regex);
        if (boundedContextConfigPath === undefined || boundedContextConfigPath === '') return null;
        this.logger.info(`Found bounded context configuration at path '${boundedContextConfigPath}'`);

        let boundedContextObj = JSON.parse(this.fileSystem.readFileSync(boundedContextConfigPath, 'utf8'));
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
        return this.fileSystem.existsSync(filePath);
    }

    /**
     * Retrieves the boilerplate configurations for bounded context with the given language
     * @param {string} language 
     * @return {Boilerplate[]} The bounded context {Boilerplate} with of the given language
     */
    boilerplatesByLanguage(language) {
        let boilerplates = this.boilerplatesManager.boilerplatesByLanguageAndType(language, boundedContextBoilerplateType);
        
        return boilerplates;
    }
    /**
     * Gets the adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @memberof BoundedContextsManager
     */
    getAdornments(language = undefined, boilerplateName = undefined) {
        return this.boilerplatesManager.getAdornments(boundedContextBoilerplateType, language, boilerplateName).filter(_ => _.type === 'adornment');
    }
    /**
     * Gets the interaction adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @memberof BoundedContextsManager
     */
    getInteractionLayers(language = undefined, boilerplateName = undefined) {
        return this.boilerplatesManager.getAdornments(boundedContextBoilerplateType, language, boilerplateName).filter(_ => _.type === 'interaction');
    }
    /**
     * Create dependencies used for prompting the user for interaction layers
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @returns {Dependency[]}
     * @memberof BoundedContextsManager
     */
    createInteractionDependencies(language = undefined, boilerplateName = undefined) {
        let interactionLayers = this.getInteractionLayers(language, boilerplateName);
        let interactionLayerTypes = groupBy('target')(interactionLayers);
        return Object.keys(interactionLayerTypes)
            .map(target => new Dependency(
                `Choose ${target} interaction layer`,
                `interaction${target}`,
                'userInput',
                undefined,
                'chooseOne',
                interactionLayers.map(_ => _.name).concat('None'),
                `Choose ${target} interaction layer`
            ));
    }
    /**
     * Creates a dolittle bounded context.
     * 
     * Interaction layers will be created as well if the dependencies are supplied in the context object.
     *
     * @param {any} context The template context
     * @param {Boilerplate} boilerplate The Bounded Context Boilerplate
     * @param {string} destinationPath The absolute path of the destination of the bounded context
     * @returns {boolean} Whether or not the bounded context was created successfully
     */
    createBoundedContext(context, boilerplate, destinationPath) {
        let application = this.applicationsManager.getApplicationFrom(destinationPath);
        if (!application) throw new Error('Could not find application configuration');
        context.applicationId = application.id;
        
        const boundedContextPath = path.join(destinationPath, context.name);
        const boundedContextConfigPath = path.join(boundedContextPath, boundedContextFileName);
        
        this.boilerplatesManager.createInstance(boilerplate, boundedContextPath, context);

        let boundedContextJson = this.fileSystem.readJsonSync(boundedContextConfigPath);
        let interactionLayers = [];
        let interactionLayerChoices = Object.keys(context).filter(_ => _.startsWith('interaction'));

        if (interactionLayerChoices.length > 0) {
            let interactionLayerNames = interactionLayerChoices.map(prop => context[prop]);
            let interactionLayerBoilerplates = this.getInteractionLayers(language, boilerplate.name);
            interactionLayerBoilerplates = interactionLayerBoilerplates.filter(boilerplate => interactionLayerNames.includes(boilerplate.name));
            interactionLayerBoilerplates.forEach(boilerplate => {
                let entryPoint = `${boilerplate.target[0].toUpperCase()}${boilerplate.target.slice(1)}`;
                interactionLayers.push(
                    new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint)
                );
                this.boilerplatesManager.createInstance(boilerplate, path.join(boundedContextPath, entryPoint), context);
            });
        }
        let boundedContext = new BoundedContext(boundedContextJson.application, boundedContextJson.boundedContext, boundedContextJson.boundedContextName, 
            resourcesFromJson(boundedContextJson.resources), coreFromJson(boundedContextJson.core), interactionLayers, boundedContextPath);

        this.fileSystem.writeJsonSync(boundedContextConfigPath, boundedContext.toJson(), {spaces: 4});
        return true;
    }
    /**
     * Creates an interaction layer and adds it to the bounded context
     *
     * @param {*} context
     * @param {Boilerplate} boilerplate
     * @param {string} boundedContextFolder
     * @param {string} entryPoint
     * @memberof BoundedContextsManager
     */
    addInteractionLayer(context, boilerplate, boundedContextFolder, entryPoint) {
        let boundedContext = this.getNearestBoundedContextConfig(boundedContextFolder);
        if (!boundedContext) throw new Error('Could not discover the bounded context');
        this.boilerplatesManager.createInstance(boilerplate, path.join(boundedContext, entryPoint), context);
        boundedContext.addInteractionLayer(new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint));
        this.fileSystem.writeJsonSync(boundedContextConfigPath, boundedContext.toJson(), {spaces: 4, });
    }
    
}