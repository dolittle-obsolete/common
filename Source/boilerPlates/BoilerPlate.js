import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
const _path = require('path');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a boiler plate
 */
export class BoilerPlate {

    /**
     * @type {string}
     */
    #language;
    #name;
    #description;
    #type;
    #dependencies;
    #path;
    #pathsNeedingBinding;
    #filesNeedingBinding;
    #contentDirectory;
    /**
     * Initializes a new instance of {BoilerPlate}
     * @param {string} programming language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} path 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language, name, description, type, dependencies, path, pathsNeedingBinding, filesNeedingBinding) {
        this.#language = language;
        this.#name = name;
        this.#description = description;
        this.#type = type;
        this.#dependencies = dependencies;
        this.#path = path;
        this.#pathsNeedingBinding = pathsNeedingBinding || [];
        this.#filesNeedingBinding = filesNeedingBinding || [];
        let dir = getFileDirPath(this.#path);
        this.#contentDirectory = this.#type !== 'artifacts'?
            _path.join(dir, 'Content')
            : dir;
    }

    /**
     * Get the name of the {BoilerPlate}
     * @returns {string} Name of {BoilerPlate}
     */
    get name() { return this.#name; }

    /**
     * Get the language of the {BoilerPlate}
     * @returns {string} Language of the {BoilerPlate}
     */
    get language() { return this.#language; }

    /**
     * Get the description of the {BoilerPlate}
     * @returns {string} Description of the {BoilerPlate}
     */
    get description() { return this.#description; }

    /**
     * Get the type of {BoilerPlate}
     * @returns {string} Type of {BoilerPlate}
     */
    get type() { return this.#type; }
    /**
     * Gets all the dependencies of the boilerplate
     * @returns {Dependency[]}
     */
    get dependencies() { return this.#dependencies; }
    /**
     * Get the file path of the {BoilerPlate} configuration file
     * @returns {string}
     */
    get path() { return this.#path; }

    /**
     * Get the paths that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Paths
     */
    get pathsNeedingBinding() {return this.#pathsNeedingBinding; }

    /**
     * Gets the files that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Files
     */
    get filesNeedingBinding() {return this.#filesNeedingBinding; }

    /**
     * Gets the path of the directory of the boilerplate files 
     *
     * @returns {string}
     * @readonly
     * @memberof BoilerPlate
     */
    get contentDirectory() {
        return this.#contentDirectory;
    }

    /**
     * Convert to a JSON object
     * @returns Object literal
     */
    toJson() {
        return {
            name: this.#name,
            language: this.#language,
            description: this.#description,
            type: this.#type,
            dependencies: this.#dependencies,
            path: this.#path,
            pathsNeedingBinding: this.#pathsNeedingBinding,
            filesNeedingBinding: this.#filesNeedingBinding
        };
    }
    /**
     * Check if this is equal to boilerPlate
     *
     * @param {BoilerPlate} boilerPlate
     * @memberof BoilerPlate
     */
    equals(boilerPlate) {
        return this.#language === boilerPlate.language
                && this.#name === boilerPlate.name
                && this.#type === boilerPlate.type;
         
    }
}