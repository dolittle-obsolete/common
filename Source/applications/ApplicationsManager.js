/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerPlate } from "../boilerPlates/BoilerPlate";
import { Dependency } from "../dependencies/Dependency";
import { BoilerPlatesManager } from "../boilerPlates/BoilerPlatesManager";
import { Application, applicationFromJson } from "./Application";

const path = require('path');
export const applicationBoilerplateType = 'application';

export const applicationFilename = 'application.json';
/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager {
    #boilerPlatesManager;
    #fileSystem;
    #logger;

    /**
     *Creates an instance of ApplicationsManager.
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof ApplicationsManager
     */
    constructor(boilerPlatesManager, fileSystem, logger) {
        this.#boilerPlatesManager = boilerPlatesManager;
        this.#fileSystem = fileSystem;
        this.#logger = logger;
    }

    /**
     * Gets the application configuration from the given folder
     * @param {string} folder path 
     * @param {Application | null} application config or null if not found
     */
    getApplicationFrom(folder) {
        if (! this.hasApplication(folder)) 
            return null;
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
        let boilerplate = this.boilerPlateByLanguage(language);
        return boilerplate? boilerplate.dependencies : [];
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
            return null;
        }
        if (boilerPlates.length > 1) {
            this.#logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${applicationBoilerplateType}`);
            return null;
        }
        return boilerPlates[0];
    }
    /**
     * Creates a dolittle application based
     *
     * @param {any} context The template context 
     * @param {string} destinationPath The absolute path of the destination of the application
     * @returns {boolean} Whether or not the application was created successfully
     */
    createApplication(context, destinationPath) {
        let boilerPlate = this.#boilerPlatesManager.boilerPlatesByType(applicationBoilerplateType)[0];

        if (!boilerPlate) return false;

        this.#boilerPlatesManager.createInstance(boilerPlate, destinationPath, context);
        return true;
    }


}