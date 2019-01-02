/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getFileDirPath } from "../helpers";
import { artifactTemplateFromJson, ArtifactTemplate } from "./ArtifactTemplate";
import { BoilerPlate } from "../boilerPlates/BoilerPlate";
import { Dependency } from "../dependencies/Dependency";
import { BoilerPlatesManager } from "../boilerPlates/BoilerPlatesManager";
import { Folders } from "../Folders";


export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactsManager {
    #boilerPlatesManager;
    #folders;
    #fileSystem;
    #logger;
    
    /**
     * Creates an instance of ArtifactsManager.
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof ArtifactsManager
     */
    constructor(boilerPlatesManager, folders, fileSystem, logger) {
        this.#boilerPlatesManager = boilerPlatesManager;
        this.#folders = folders;
        this.#fileSystem = fileSystem;
        this.#logger = logger;
    }
    /**
     * Gets all the dependencies of an artifact type of a given language
     *
     * @export
     * @param {string} artifactType
     * @param {string} language
     * @returns {Dependency[]}
     */
    getDependencies(artifactType, language) {
        let dependencies = [];
        let boilerplate = this.boilerPlateByLanguage(language);
        dependencies.push(...boilerplate.dependencies);
        let template = this.templateByBoilerplate(boilerplate, artifactType);
        dependencies.push(...template.dependencies);

        return dependencies;
    }
    /**
     * Retrieves the boilerplate.json configuration for artifacts with the given language
     * @param {string} language 
     * @return {BoilerPlate} The Boilerplate with of the given language
     */
    boilerPlateByLanguage(language) {
        let boilerPlates = this.#boilerPlatesManager.boilerPlatesByLanguageAndType(language, artifactsBoilerplateType);
        if (boilerPlates === null || boilerPlates.length === 0) {
            this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${artifactsBoilerplateType}`);
            throw 'Could not find boilerplate for given language and type';
        }
        if (boilerPlates.length > 1) {
            this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${artifactsBoilerplateType}`);
            throw 'Found multiple boilerplates';
        }
        return boilerPlates[0];
    }
    /**
     * Gets the artifact template alongside with the location of where it was found based on the language and type of the artifact
     * @param {BoilerPlate} boilerPlate 
     * @param {string} artifactType
     * @returns {ArtifactTemplate}
     */
    templateByBoilerplate(boilerPlate, artifactType)
    {
        let templateFiles = this.#folders.searchRecursive(boilerPlate.location, 'template.json');
        let templates = [];
        templateFiles.forEach(_ => {
            let location = getFileDirPath(_);
            let template = artifactTemplateFromJson(JSON.parse(this.#fileSystem), location);
            if (template.language === boilerPlate.language && template.type === artifactType)
                templates.push(template);
        });

        if (templates.length === 0) {
            this.#logger.error(`Could not find any artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
            throw new Error('Artifact template not found');
        }
        if (templates.length > 1) {
            this.#logger.error(`Found multiple artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
            throw new Error('Multiple artifact templates found');
        }
        return templates[0];
    }
    /**
     * Creates an artifact of the given type at the given destination with the given name 
     * @param {any} context 
     * @param {string} language
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * 
     */
    createArtifact(context, language, artifactTemplate, destinationPath) {
        this.#logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${language}'`);
        this.#boilerPlatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        
    }

}