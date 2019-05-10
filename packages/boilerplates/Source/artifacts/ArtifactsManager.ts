/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Logger} from 'winston';
import { ArtifactTemplate } from "./ArtifactTemplate";
import { ICanManageBoilerplates } from '../ICanManageBoilerplates';
import { ICanManageArtifactTemplates } from './ICanManageArtifactTemplates';
import { BaseBoilerplate } from 'Source/BaseBoilerplate';

export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactsManager implements ICanManageArtifactTemplates {
    private _boilerplatesManager: ICanManageBoilerplates;
    private _logger: Logger;
    
    /**
     * Creates an instance of ArtifactsManager.
     * @param {ICanManageBoilerplates} boilerplatesManager
     * @param {Logger} logger
     * @memberof ArtifactsManager
     */
    constructor(boilerplatesManager: ICanManageBoilerplates, logger: Logger) {
        this._boilerplatesManager = boilerplatesManager;
        this._logger = logger;
    }
    /**
     * Retrieves the boilerplate configurations for artifacts with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {BaseBoilerplate[]} The Artifact Boilerplates of the given language
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[] {
        let boilerplates = this._boilerplatesManager.boilerplatesByLanguageAndType(language, artifactsBoilerplateType, namespace);
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
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): boolean {
        this.logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${artifactTemplate.boilerplate.language}' at destination ${destinationPath}`);
        this.boilerplatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        return true;
    }
}