/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '@dolittle/tooling.common.dependencies';
import { Folders, getFileDirPath, getFileNameAndExtension } from '@dolittle/tooling.common.utilities';
import * as FsExtra from 'fs-extra';
import { ArtifactTemplate, BaseBoilerplate, Scripts } from './internal';

export const artifactsBoilerplateContentFolderName = 'Templates';
/**
 * Represents a boilerplate for artifacts
 */
export class ArtifactsBoilerplate extends BaseBoilerplate {

    private _artifactTemplates: ArtifactTemplate[] = [];
    
    /**
     * Initializes a new instance of {ArtifactsBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path 
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: Dependency[], namespace: string, scripts: Scripts, path: string, folders: Folders, fileSystem: typeof FsExtra) {
        super(language, name, description, type, dependencies, namespace, scripts, path);
        this.folders = folders;
        this.fileSystem = fileSystem;
    }
    /**
     * The {Folders} object for working with folders
     *
     * @type {Folders}
     * @memberof ArtifactsBoilerplate
     */
    readonly folders: Folders;
    /**
     *
     *
     * @type {typeof FsExtra}
     * @memberof ArtifactsBoilerplate
     */
    readonly fileSystem: typeof FsExtra;

    /**
     * Gets the artifact templates belonging under this boilerplate
     * @type {ArtifactTemplate[]}
     * @readonly
     * @memberof ArtifactsBoilerplate
     */
    get artifactTemplates() {
        if (!this._artifactTemplates) this.loadArtifactTemplates();
        return this._artifactTemplates;
    }
    /**
     * Gets the artifact templates with the given artifact type
     *
     * @param {string} artifactType
     * @returns {ArtifactTemplate[]} Artifact templates with given type 
     * @memberof ArtifactsBoilerplate
     */
    artifactTemplatesByType(artifactType: string): ArtifactTemplate[] {
        return this.artifactTemplates.filter(_ => _.type === artifactType);
    }
    private loadArtifactTemplates() {
        let templateFiles = this.folders.searchRecursive(this.contentDirectory, 'template.json');
        this._artifactTemplates = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.getIncludedFiles(getFileDirPath(_));
            let template = ArtifactTemplate.fromJson(JSON.parse(this.fileSystem.readFileSync(_).toString()), _, includedFiles, this);
            this._artifactTemplates.push(template);
        });
    }
    private getIncludedFiles(folderPath: string): string[] {
        return this.folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== 'template.json');
    }
}