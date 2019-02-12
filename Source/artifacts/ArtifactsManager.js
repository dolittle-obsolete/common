/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getFileDirPath, getFileNameAndExtension } from "../helpers";
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
        dependencies.push(...boilerplate? boilerplate.dependencies : []);
        let template = this.templateByBoilerplate(boilerplate, artifactType);
        dependencies.push(...template? template.dependencies : []);

        return dependencies;
    }
    /**
     * Retrieves the boilerplate.json configuration for artifacts with the given language
     * @param {string} language 
     * @return {BoilerPlate | null} The Boilerplate with of the given language
     */
    boilerPlateByLanguage(language) {
        let boilerPlates = this.#boilerPlatesManager.boilerPlatesByLanguageAndType(language, artifactsBoilerplateType);
        if (boilerPlates === null || boilerPlates.length === 0) {
            this.#logger.error(`Could not find a boilerplate for language: ${language} and type: ${artifactsBoilerplateType}`);
            return null;
        }
        if (boilerPlates.length > 1) {
            this.#logger.error(`Found more than one boilerplate configuration for language: ${language} and type: ${artifactsBoilerplateType}`);
            return null;
        }
        return boilerPlates[0];
    }
    /**
     * Gets the artifact template based on the core language and the type of the artifact
     *
     * @param {string} language
     * @param {string} artifactType
     * @returns {ArtifactTemplate | null}
     * @memberof ArtifactsManager
     */
    getArtifactTemplate(language, artifactType) {
        let boilerPlate = this.boilerPlateByLanguage(language);
        if (!boilerPlate) return null;
        return this.templateByBoilerplate(boilerPlate, artifactType);
    }
    /**
     * Gets the artifact template based on the {BoilerPlate} and type of the artifact
     * @param {BoilerPlate} boilerPlate 
     * @param {string} artifactType
     * @returns {ArtifactTemplate | null}
     */
    templateByBoilerplate(boilerPlate, artifactType) {
        let templateFiles = this.#folders.searchRecursive(boilerPlate.contentDirectory, 'template.json');
        let templates = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.#getIncludedFiles(getFileDirPath(_));
            let template = artifactTemplateFromJson(JSON.parse(this.#fileSystem.readFileSync(_)), _, includedFiles, boilerPlate);
            if (template.type === artifactType)
                templates.push(template);
        });
        if (templates.length === 0) {
            this.#logger.error(`Could not find any artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
            return null;
        }
        if (templates.length > 1) {
            this.#logger.error(`Found multiple artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
            return null;
        }
        return templates[0];
    }
    /**
     * Creates an artifact of the given type at the given destination with the given name 
     * @param {any} context 
     * @param {string} language
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     * 
     */
    createArtifact(context, language, artifactTemplate, destinationPath) {
        this.#logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${language}'`);
        this.#boilerPlatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        return true;
    }

    #getIncludedFiles(folderPath) {
        return this.#folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file === 'template.json');
    }
}