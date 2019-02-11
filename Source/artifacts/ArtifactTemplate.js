/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyFromJson, Dependency } from '../dependencies/Dependency';
import { areas, getFileDirPath } from '../helpers';

const _path = require('path');
/**
 * Creates an {ArtifactTemplate} from json object
 *
 * @export
 * @param {any} obj The template json object
 * @param {string} path The path of the template file
 * @returns The created {ArtifactTemplate}
 */
export function artifactTemplateFromJson(obj, path) {
    return new ArtifactTemplate(obj.name, obj.type, obj.area, obj.description, obj.language,
        obj.dependencies !== undefined? 
            Object.keys(obj.dependencies).map(key => dependencyFromJson(obj.dependencies[key], key))
            : [], obj.includedFiles, path);
}

function throwIfInvalidArea(area) {
    if (!areas.includes(area)) {
        throw new Error('Invalid area');
    }
}
/**
  * Represents an artifact template
  */
export class ArtifactTemplate
{
    #name;
    #type;
    #area;
    #description;
    #language;
    #dependencies;
    #includedFiles;
    #path;
    /**
     *Creates an instance of ArtifactTemplate.
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {string} language
     * @param {Dependency[]} dependencies
     * @param {string[]} includedFiles
     * @param {string} path
     * @memberof ArtifactTemplate
     */
    constructor (name, type, area, description, language, dependencies, includedFiles, path) {
        this.#name = name;
        this.#type = type;
        this.#area = area;
        this.#description = description;
        this.#language = language;
        this.#dependencies = dependencies || [];
        this.#includedFiles = includedFiles || [];
        this.#path = path;

        throwIfInvalidArea(area);
    }
    /**
     * Gets the name of the artifact template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get name() {
        return this.#name;
    }
    /**
     * Gets the type of the artifact template
     * @returns {string}
     */
    get type() {
        return this.#type;
    }
    /**
     * Gets the area of the artifact.
     *
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get area() {
        return this.#area;
    }
    /**
     * Gets the description of the artifact template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get description() {
        return this.#description;
    }
    /**
     * Gets the programming language of the artifact this is a template for
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get language() {
        return this.#language;
    }
    /**
     * Gets the dependencies of the template
     * @readonly
     * @memberof ArtifactTemplate
     */
    get dependencies() {
        return this.#dependencies;
    }
    /**
     * Gets the list of files that needs to be templated
     * @returns {string[]}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get includedFiles() {
        return this.#includedFiles;
    }
    /**
     * Gets the path of the template file
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get path() {
        return this.#path;
    }
    /**
     * Gets a list of the files that needs to be created
     *
     * @returns {string[]}
     * @memberof ArtifactTemplate
     */
    getFilesToCreate() {
        const dir = getFileDirPath(this.#path); 
        return this.#includedFiles.map(_ => _path.join(dir, _));
    }
}