/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getFileDirPath, getFileNameAndExtension } from "../helpers";
import { artifactTemplateFromJson, ArtifactTemplate } from "./ArtifactTemplate";
import { Boilerplate } from "../boilerplates/Boilerplate";
import { Dependency } from "../dependencies/Dependency";
import { BoilerplatesManager } from "../boilerplates/BoilerplatesManager";
import { Folders } from "../Folders";

export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactsManager {
    #_boilerplatesManager;
    #_folders;
    #_fileSystem;
    #_logger;
    
    /**
     * Creates an instance of ArtifactsManager.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @memberof ArtifactsManager
     */
    constructor(boilerplatesManager, folders, fileSystem, logger) {
        this.#_boilerplatesManager = boilerplatesManager;
        this.#_folders = folders;
        this.#_fileSystem = fileSystem;
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
     * @type {Folders}
     * @readonly
     * @memberof ArtifactsManager
     */
    get folders() {
        return this.#_folders;
    }
    /**
     *
     * @type {import('fs-extra')}
     * @readonly
     * @memberof ArtifactsManager
     */
    get fileSystem() {
        return this.#_fileSystem;
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
     * Gets all the dependencies of an artifact type of a given language
     *
     * @export
     * @param {string} artifactType
     * @param {string} language
     * @returns {Dependency[]}
     */
    getDependencies(artifactType, language) {
        let dependencies = [];
        let boilerplate = this.boilerplateByLanguage(language);
        if (!boilerplate) throw new Error(`Could not find boilerplate with type ${artifactsBoilerplateType} and language ${language}`);
        dependencies.push(...boilerplate.dependencies);
        let template = this.templateByBoilerplate(boilerplate, artifactType);
        if (!template) throw new Error(`Could not find template with type ${artifactType}`);
        dependencies.push(...template.dependencies);

        return dependencies;
    }
    /**
     * Retrieves the boilerplate.json configuration for artifacts with the given language
     * @param {string} language 
     * @return {Boilerplate | null} The Boilerplate with of the given language
     */
    boilerplateByLanguage(language) {
        let boilerplates = this.boilerplatesManager.boilerplatesByLanguageAndType(language, artifactsBoilerplateType);
        if (boilerplates === null || boilerplates.length === 0) {
            return null;
        }
        if (boilerplates.length > 1) {
            return null;
        }
        return boilerplates[0];
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
        let boilerplate = this.boilerplateByLanguage(language);
        if (!boilerplate) return null;
        return this.templateByBoilerplate(boilerplate, artifactType);
    }
    /**
     * Gets the artifact template based on the {Boilerplate} and type of the artifact
     * @param {Boilerplate} boilerplate 
     * @param {string} artifactType
     * @returns {ArtifactTemplate | null}
     */
    templateByBoilerplate(boilerplate, artifactType) {
        let templateFiles = this.folders.searchRecursive(boilerplate.contentDirectory, 'template.json');
        let templates = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.#_getIncludedFiles(getFileDirPath(_));
            let template = artifactTemplateFromJson(JSON.parse(this.fileSystem.readFileSync(_)), _, includedFiles, boilerplate);
            if (template.type === artifactType)
                templates.push(template);
        });
        if (templates.length === 0) {
            this.logger.error(`Could not find any artifact templates with artifact type '${artifactType}' and language '${boilerplate.language}'`);
            return null;
        }
        if (templates.length > 1) {
            this.logger.error(`Found multiple artifact templates with artifact type '${artifactType}' and language '${boilerplate.language}'`);
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
        this.logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${language}'`);
        this.boilerplatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        return true;
    }

    #_getIncludedFiles(folderPath) {
        return this.folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== 'template.json');
    }
}