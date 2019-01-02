/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyFromJson, Dependency } from '../dependencies/Dependency';
import { areas } from '../helpers';

/**
 * Creates an {ArtifactTemplate} from json object
 *
 * @export
 * @param {any} obj
 * @param {string} location
 * @returns The created {ArtifactTemplate}
 */
export function artifactTemplateFromJson(obj, location) {
    return new ArtifactTemplate(obj.name, obj.type, obj.area, obj.description, obj.language,
        obj.dependencies.map(depObj => dependencyFromJson(depObj)), obj.includedFiles, location);
}

function throwIfInvalidArea(area) {
    if (!areas.includes(area)) {
        throw 'Invalid area';
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
    #location;
    /**
     *Creates an instance of ArtifactTemplate.
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {string} language
     * @param {Dependency[]} dependencies
     * @param {string[]} includedFiles
     * @param {string} location
     * @memberof ArtifactTemplate
     */
    constructor (name, type, area, description, language, dependencies, includedFiles, location) {
        this.#name = name;
        this.#type = type;
        this.#area = area;
        this.#description = description;
        this.#language = language;
        this.#dependencies = dependencies;
        this.#includedFiles = includedFiles;
        this.#location = location;

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
        return this.#type;
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
     * Gets the file location of the template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get location() {
        return this.#location;
    }
}