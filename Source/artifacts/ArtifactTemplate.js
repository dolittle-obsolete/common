/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyFromJson, Dependency } from '../dependencies/Dependency';
import { areas, getFileDirPath } from '../helpers';
import _path from 'path';
import { BoilerPlate } from '../boilerPlates/BoilerPlate';
/**
 * Creates an {ArtifactTemplate} from json object
 *
 * @export
 * @param {any} obj The template json object
 * @param {string} path The path of the template file
 * @param {string[]} path The files that needs to be created by the template
 * @returns The created {ArtifactTemplate}
 */
export function artifactTemplateFromJson(obj, path, includedFiles, boilerplate) { 
    return new ArtifactTemplate(boilerplate, obj.name, obj.type, obj.area, obj.description,
        obj.dependencies !== undefined? 
            Object.keys(obj.dependencies).map(key => dependencyFromJson(obj.dependencies[key], key))
            : [], includedFiles, path);
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
    #boilerplate;
    #name;
    #type;
    #area;
    #description;
    #dependencies;
    #includedFiles;
    #path;
    /**
     *Creates an instance of ArtifactTemplate.
     * @param {BoilerPlate} boilerplate
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {Dependency[]} dependencies
     * @param {string[]} includedFiles
     * @param {string} path
     * @memberof ArtifactTemplate
     */
    constructor (boilerplate, name, type, area, description, dependencies, includedFiles, path) {
        this.#boilerplate = boilerplate;
        this.#name = name;
        this.#type = type;
        this.#area = area;
        this.#description = description;
        this.#dependencies = dependencies || [];
        this.#includedFiles = includedFiles || [];
        this.#path = path;

        throwIfInvalidArea(area);
    }
    get boilerplate() {
        return this.#boilerplate;
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