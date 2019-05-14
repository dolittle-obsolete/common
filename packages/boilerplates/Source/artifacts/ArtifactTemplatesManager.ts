/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ExpectedBoilerplateError } from '../ExpectedBoilerplateError';
import { Logger } from 'winston';
import { ArtifactsBoilerplate } from '../ArtifactsBoilerplate';
import { ArtifactTemplate } from "./ArtifactTemplate";
import { CreatedArtifactTemplateDetails } from './CreatedArtifactTemplateDetails';
import { IArtifactTemplateCreator } from './IArtifactTemplateCreator';
import { IArtifactTemplatesManager } from './IArtifactTemplatesManager';
import { IBoilerplateManagers } from '../IBoilerplateManagers';

export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactTemplatesManager implements IArtifactTemplatesManager {
    private _boilerplates: ArtifactsBoilerplate[];
    private _artifactTemplateCreator: IArtifactTemplateCreator;
    private _boilerplateManagers: IBoilerplateManagers;
    private _logger: Logger;
    
    /**
     * Creates an instance of ArtifactsManager.
     * @param {IBoilerplateManagers} boilerplateManagers
     * @param {Logger} logger
     * @memberof ArtifactsManager
     */
    constructor(boilerplateManagers: IBoilerplateManagers, artifactTemplateCreator: IArtifactTemplateCreator, logger: Logger) {
        this._boilerplateManagers = boilerplateManagers;
        this._artifactTemplateCreator = artifactTemplateCreator
        this._logger = logger;
        this._boilerplates = [];

        this.loadAllBoilerplates();
    }
    get boilerplates(): ArtifactsBoilerplate[] {
        this.loadAllBoilerplates();
        return this._boilerplates;
    }
    get hasBoilerplate(): boolean {
        let boilerplates = this.boilerplates;
        return boilerplates && boilerplates.length > 0;
    }
    /**
     * Retrieves the boilerplate configurations for artifacts with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {BaseBoilerplate[]} The Artifact Boilerplates of the given language
     */
    boilerplatesByLanguage(language: string, namespace?: string): ArtifactsBoilerplate[] {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        });
    }
    /**
     * Creates an artifact base on the artifact template at the given destination
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {CreatedArtifactTemplateDetails} Whether or not the artifact was created successfully
     * 
     */
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): CreatedArtifactTemplateDetails {
        this._logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${artifactTemplate.boilerplate.language}' at destination ${destinationPath}`);
        this._artifactTemplateCreator.createArtifactBoilerplate(artifactTemplate, destinationPath, context);
        return {artifactTemplate, boilerplate: artifactTemplate.boilerplate, destination: destinationPath};
    }


    private loadAllBoilerplates()  {
        this._boilerplates = this._boilerplateManagers.boilerplatesByType(artifactsBoilerplateType).map(_ => {
            if (_ instanceof ArtifactsBoilerplate) return _;
            else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${ArtifactsBoilerplate.name}' but got a '${_.constructor.name}'`)
        });
    }
}