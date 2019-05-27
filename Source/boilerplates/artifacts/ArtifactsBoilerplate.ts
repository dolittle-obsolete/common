/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '@dolittle/tooling.common.dependencies';
import { Folders, getFileDirPath, getFileNameAndExtension } from '@dolittle/tooling.common.utilities';
import * as FsExtra from 'fs-extra';
import { ArtifactTemplate, Boilerplate, Scripts } from '../index';

export const artifactsBoilerplateContentFolderName = 'Templates';

/**
 * Represents a boilerplate for artifacts
 */
export class ArtifactsBoilerplate extends Boilerplate {

    readonly contentDirectoryName = 'Templates';
    
    private _artifactTemplates!: ArtifactTemplate[];
    
    /**
     * Instantiates a new instance of {ArtifactsBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {IDependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path 
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: IDependency[], namespace: string, scripts: Scripts, path: string, private _folders: Folders, private _fileSystem: typeof FsExtra) {
        super(language, name, description, type, dependencies, namespace, scripts, path);
    }

    /**
     * Gets the artifact templates belonging under this boilerplate
     * @type {ArtifactTemplate[]}
     * @readonly
     */
    get artifactTemplates() {
        if (! this._artifactTemplates) this.loadArtifactTemplates();
        return this._artifactTemplates;
    }

    /**
     * Gets the artifact templates with the given artifact type
     *
     * @param {string} artifactType
     * @returns {ArtifactTemplate[]} Artifact templates with given type 
     */
    artifactTemplatesByType(artifactType: string) {
        return this.artifactTemplates.filter(_ => _.type === artifactType);
    }

    private loadArtifactTemplates() {
        let templateFiles = this._folders.searchRecursive(this.contentDirectory, 'template.json');
        this._artifactTemplates = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.getIncludedFiles(getFileDirPath(_));
            let template = ArtifactTemplate.fromJson(JSON.parse(this._fileSystem.readFileSync(_).toString()), _, includedFiles, this);
            this._artifactTemplates.push(template);
        });
    }
    
    private getIncludedFiles(folderPath: string) {
        return this._folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== 'template.json');
    }
}

