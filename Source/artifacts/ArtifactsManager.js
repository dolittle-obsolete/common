/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate } from "./ArtifactTemplate";
import { BoilerplatesManager } from "../boilerplates/BoilerplatesManager";
import { ArtifactsBoilerplate } from "../boilerPlates/ArtifactsBoilerplate";

export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactsManager {
    #_boilerplatesManager;
    #_logger;
    
    /**
     * Creates an instance of ArtifactsManager.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {import('winston').Logger} logger
     * @memberof ArtifactsManager
     */
    constructor(boilerplatesManager, logger) {
        this.#_boilerplatesManager = boilerplatesManager;
        this.#_logger = logger;
    }
    /**
     * 
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof ArtifactsManager
     */
    get boilerplatesManager() {
        return this.#_boilerplatesManager;
    }
    /**
     *
     * @type {import('winston').Logger}
     * @readonly
     * @memberof ArtifactsManager
     */
    get logger() {
        return this.#_logger;
    }
    /**
     * Retrieves the boilerplate configurations for artifacts with the given language
     * @param {string} language 
     * @return {ArtifactsBoilerplate[]} The Artifact Boilerplates of the given language
     */
    boilerplatesByLanguage(language) {
        let boilerplates = this.boilerplatesManager.boilerplatesByLanguageAndType(language, artifactsBoilerplateType);
        return boilerplates;
    }
    /**
     * Creates an artifact base on the artifact template at the given destination
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     * 
     */
    createArtifact(context, artifactTemplate, destinationPath) {
        this.logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${artifactTemplate.boilerplate.language}' at destination ${destinationPath}`);
        this.boilerplatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        return true;
    }
}