/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyFromJson } from '../dependencies/Dependency';
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
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _name = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _type = new WeakMap(); 
/**
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _area = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _description = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _language = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, import('../dependencies/Dependency').Dependency[]>}
 */
const _dependencies = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, string[]>}
 */
const _includedFiles = new WeakMap();
/**
 * @type {WeakMap<ArtifactTemplate, string>}
 */
const _location = new WeakMap();

/**
  * Represents an artifact template
  */
export class ArtifactTemplate
{
    /**
     *Creates an instance of ArtifactTemplate.
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {string} language
     * @param {import('../dependencies/Dependency').Dependency[]} dependencies
     * @param {string[]} includedFiles
     * @param {string} location
     * @memberof ArtifactTemplate
     */
    constructor (name, type, area, description, language, dependencies, includedFiles, location) {
        _name.set(this, name);
        _type.set(this, type);
        _area.set(this, area);
        _description.set(this, description);
        _language.set(this, language);
        _dependencies.set(this, dependencies);
        _includedFiles.set(this, includedFiles);
        _location.set(this, location);

        throwIfInvalidArea(area);
    }
    /**
     * Gets the name of the artifact template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get name() {
        return _name.get(this);
    }
    /**
     * Gets the type of the artifact template
     * @returns {string}
     */
    get type() {
        return _type.get(this);
    }
    /**
     * Gets the area of the artifact.
     *
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get area() {
        return _type.get(this);
    }
    /**
     * Gets the description of the artifact template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get description() {
        return _description.get(this);
    }
    /**
     * Gets the programming language of the artifact this is a template for
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get language() {
        return _language.get(this);
    }
    /**
     * Gets the dependencies of the template
     * @readonly
     * @memberof ArtifactTemplate
     */
    get dependencies() {
        return _dependencies.get(this);
    }
    /**
     * Gets the list of files that needs to be templated
     * @returns {string[]}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get includedFiles() {
        return _includedFiles.get(this);
    }
    /**
     * Gets the file location of the template
     * @returns {string}
     * @readonly
     * @memberof ArtifactTemplate
     */
    get location() {
        return _location.get(this);
    }
}