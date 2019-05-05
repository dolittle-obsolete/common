/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerplatesManager } from "../boilerplates/BoilerplatesManager";
import { Application, applicationFromJson } from "./Application";
import path from 'path';
import { BaseBoilerplate } from "../boilerplates/BaseBoilerplate";

export const applicationBoilerplateType = 'application';
export const applicationFilename = 'application.json';
/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager {
    #_boilerplatesManager;
    #_fileSystem;
    #_logger;

    /**
     *Creates an instance of ApplicationsManager.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof ApplicationsManager
     */
    constructor(boilerplatesManager, fileSystem, logger) {
        this.#_boilerplatesManager = boilerplatesManager;
        this.#_fileSystem = fileSystem;
        this.#_logger = logger;
    }
    /**
     * 
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof ApplicationsManager
     */
    get boilerplatesManager() {
        return this.#_boilerplatesManager;
    }
    /**
     *
     * @type {import('fs-extra')}
     * @readonly
     * @memberof ApplicationsManager
     */
    get fileSystem() {
        return this.#_fileSystem;
    }
    /**
     *
     * @type {import('winston').Logger}
     * @readonly
     * @memberof ApplicationsManager
     */
    get logger() {
        return this.#_logger;
    }
    /**
     * Gets the application configuration from the given folder
     * @param {string} folder path 
     * @returns {Application | null} application config or null if not found
     * 
     */
    getApplicationFrom(folder) {
        if (! this.hasApplication(folder)) return null;
        const filePath = path.join(folder, applicationFilename);
        return applicationFromJson(JSON.parse(this.fileSystem.readFileSync(filePath, 'utf8')), filePath);
    }
    /**
     * Check if an application has been setup in the given folder.
     * @param {string} folder path
     * @returns {boolean} whether or not the application configuration is set up
     */
    hasApplication(folder) {
        const filePath = path.join(folder, applicationFilename);
        return this.fileSystem.existsSync(filePath);
    }

    /**
     * Retrieves the boilerplate configurations for application with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {BaseBoilerplate[]} The application {Boilerplate} with of the given language
     */
    boilerplatesByLanguage(language, namespace=undefined) {
        let boilerplates = this.boilerplatesManager.boilerplatesByLanguageAndType(language, applicationBoilerplateType, namespace);
        return boilerplates;
    }
    /**
     * Creates a dolittle application based
     *
     * @param {any} context The template context 
     * @param {string} destinationPath The absolute path of the destination of the application
     * @param {BaseBoilerplate} boilerplate The boilerplate to create the application from
     * @returns {boolean} Whether or not the application was created successfully
     */
    createApplication(context, destinationPath, boilerplate) {
        this.logger.info(`Creating an application of language '${boilerplate.language}' at destination ${destinationPath}`);
        this.boilerplatesManager.createInstance(boilerplate, destinationPath, context);
        return true;
    }
}