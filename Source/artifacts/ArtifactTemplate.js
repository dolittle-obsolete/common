/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyFromJson, Dependency } from '../dependencies/Dependency';
import { areas, getFileDirPath } from '../helpers';
import _path from 'path';
import { BaseBoilerplate } from '../boilerplates/BaseBoilerplate';
/**
 * Creates an {ArtifactTemplate} from json object
 *
 * @export
 * @param {any} obj The template json object
 * @param {string} path The path of the template file
 * @param {string[]} includedFiles The files that needs to be created by the template
 * @param {ArtifactsBoilerplate} boilerplate
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
    #_boilerplate;
    #_name;
    #_type;
    #_area;
    #_description;
    #_dependencies;
    #_includedFiles;
    #_path;
    /**
     *Creates an instance of ArtifactTemplate.
     * @param {ArtifactsBoilerplate} boilerplate
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
        this.#_boilerplate = boilerplate;
        this.#_name = name;
        this.#_type = type;
        this.#_area = area;
        this.#_description = description;
        this.#_dependencies = dependencies || [];
        this.#_includedFiles = includedFiles || [];
        this.#_path = path;

        throwIfInvalidArea(area);
    }
    /**
     * Gets the parent boilerplate object of the artifact template
     * @type {BaseBoilerplate}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get boilerplate() {
        return this.#_boilerplate;
    }
    /**
     * Gets the name of the artifact template
     * @type {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get name() {
        return this.#_name;
    }
    /**
     * Gets the type of the artifact template
     * @type {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get type() {
        return this.#_type;
    }
    /**
     * Gets the area of the artifact.
     *
     * @type {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get area() {
        return this.#_area;
    }
    /**
     * Gets the description of the artifact template
     * @type {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get description() {
        return this.#_description;
    }
    /**
     * Gets the dependencies of the template
     * @type {Dependency[]}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get dependencies() {
        return this.#_dependencies;
    }
    /**
     * Gets the list of files that needs to be templated
     * @type {string[]}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get includedFiles() {
        return this.#_includedFiles;
    }
    /**
     * Gets the path of the template file
     * @type {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get path() {
        return this.#_path;
    }
    /**
     * Gets all the dependencies needed to create this artifact
     *
     * @returns {Dependency[]}
     * @memberof ArtifactTemplate
     */
    allDependencies() {
        let dependencies = [];
        dependencies.push(...this.boilerplate.dependencies);
        dependencies.push(...this.dependencies);

        return dependencies;
    }
    /**
     * Gets a list of the files that needs to be created
     *
     * @returns {string[]}
     * @memberof ArtifactTemplate
     */
    getFilesToCreate() {
        const dir = getFileDirPath(this.path); 
        return this.includedFiles.map(_ => _path.join(dir, _));
    }
}