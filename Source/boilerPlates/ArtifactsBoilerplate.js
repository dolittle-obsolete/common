/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { BaseBoilerplate } from './BaseBoilerplate';
import { ArtifactTemplate, artifactTemplateFromJson } from '../artifacts/ArtifactTemplate';
import { Folders } from '../Folders';
import { getFileDirPath, getFileNameAndExtension } from '../helpers';

export const artifactsBoilerplateContentFolderName = 'Templates';
/**
 * Represents a boilerplate for artifacts
 */
export class ArtifactsBoilerplate extends BaseBoilerplate{
    #_artifactTemplates;
    #_folders;
    #_fileSystem;
    /**
     * Initializes a new instance of {ArtifactsBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} path 
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     */
    constructor(language, name, description, type, dependencies, path, folders, fileSystem) {
        super(language, name, description, type, dependencies, path);
        this.#_folders = folders;
        this.#_fileSystem = fileSystem;
    }
    /**
     * Gets the artifact templates belonging under this boilerplate
     * @type {ArtifactTemplate[]}
     * @readonly
     * @memberof ArtifactsBoilerplate
     */
    get artifactTemplates() {
        if (!this.#_artifactTemplates) this.#_loadArtifactTemplates();
        return this.#_artifactTemplates;
    }
    /**
     *
     * @type {Folders}
     * @readonly
     * @memberof ArtifactsBoilerplate
     */
    get folders() {return this.#_folders;}
    /**
     *
     * @type {import('fs-extra')}
     * @readonly
     * @memberof ArtifactsBoilerplate
     */
    get fileSystem() {return this.#_fileSystem;}
    /**
     * Gets the artifact templates with the given artifact type
     *
     * @param {string} artifactType
     * @returns {ArtifactTemplate[]} Artifact templates with given type 
     * @memberof ArtifactsBoilerplate
     */
    artifactTemplatesByType(artifactType) {
        return this.artifactTemplates.filter(_ => _.type === artifactType);
    }
    /**
     * gets artifact templates belonging to this boilerplate
     * @returns 
     */
    #_loadArtifactTemplates() {
        let templateFiles = this.folders.searchRecursive(this.contentDirectory, 'template.json');
        this.#_artifactTemplates = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.#_getIncludedFiles(getFileDirPath(_));
            let template = artifactTemplateFromJson(JSON.parse(this.fileSystem.readFileSync(_)), _, includedFiles, this);
            this.#_artifactTemplates.push(template);
        });
    }
    #_getIncludedFiles(folderPath) {
        return this.folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== 'template.json');
    }
}