/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Boilerplate } from "../boilerplates/Boilerplate";
import { Dependency } from "../dependencies/Dependency";
import { BoilerplatesManager } from "../boilerplates/BoilerplatesManager";
import { Application, applicationFromJson } from "./Application";
import path from 'path';

export const applicationBoilerplateType = 'application';
export const applicationFilename = 'application.json';
/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager {
    #boilerplatesManager;
    #fileSystem;
    #logger;

    /**
     *Creates an instance of ApplicationsManager.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof ApplicationsManager
     */
    constructor(boilerplatesManager, fileSystem, logger) {
        this.#boilerplatesManager = boilerplatesManager;
        this.#fileSystem = fileSystem;
        this.#logger = logger;
    }

    /**
     * Gets the application configuration from the given folder
     * @param {string} folder path 
     * @param {Application | null} application config or null if not found
     */
    getApplicationFrom(folder) {
        if (! this.hasApplication(folder)) return null;
        const filePath = path.join(folder, applicationFilename);
        return applicationFromJson(JSON.parse(this.#fileSystem.readFileSync(filePath, 'utf8')), filePath);
    }
    /**
     * Check if an application has been setup in the given folder.
     * @param {string} folder path
     * @returns {boolean} whether or not the application configuration is set up
     */
    hasApplication(folder) {
        const filePath = path.join(folder, applicationFilename);
        return this.#fileSystem.existsSync(filePath);
    }

    /**
     * Gets all the dependencies for an application of a given language
     *
     * @export
     * @param {string} language
     * @returns {Dependency[]}
     */
    getDependencies(language) {
        let boilerplate = this.boilerplateByLanguage(language);
        if (!boilerplate) throw new Error(`Could not find boilerplate with type ${applicationBoilerplateType} and language ${language}`);
        return boilerplate.dependencies;
    }
    /**
     * Retrieves the boilerplate.json configuration for application with the given language
     * @param {string} language 
     * @return {Boilerplate} The application {Boilerplate} with of the given language
     */
    boilerplateByLanguage(language) {
        let boilerplates = this.#boilerplatesManager.boilerplatesByLanguageAndType(language, applicationBoilerplateType);
        if (boilerplates === null || boilerplates.length === 0) {
            return null;
        }
        if (boilerplates.length > 1) {
            return null;
        }
        return boilerplates[0];
    }
    /**
     * Creates a dolittle application based
     *
     * @param {any} context The template context 
     * @param {string} destinationPath The absolute path of the destination of the application
     * @returns {boolean} Whether or not the application was created successfully
     */
    createApplication(context, destinationPath) {
        let boilerplate = this.#boilerplatesManager.boilerplatesByType(applicationBoilerplateType)[0];
        if (!boilerplate) return false;
        this.#boilerplatesManager.createInstance(boilerplate, destinationPath, context);
        return true;
    }


}