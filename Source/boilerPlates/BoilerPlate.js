/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
const _path = require('path');

/**
 * Represents a boiler plate
 */
export class BoilerPlate {
    #language;
    #name;
    #description;
    #type;
    #dependencies;
    #target;
    #framework;
    #parent;
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
     * @param {string} target
     * @param {string} framework
     * @param {{name: string, type: string, language: string}} parent
     * @param {string} path 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language, name, description, type, dependencies, target, framework, parent, path, pathsNeedingBinding, filesNeedingBinding) {
        this.#language = language;
        this.#name = name;
        this.#description = description;
        this.#type = type;
        this.#dependencies = dependencies;
        this.#target = target;
        this.#framework = framework;
        this.#parent = parent;
        this.#path = path;
        this.#pathsNeedingBinding = pathsNeedingBinding || [];
        this.#filesNeedingBinding = filesNeedingBinding || [];
        let dir = getFileDirPath(this.#path);
        this.#contentDirectory = _path.join(dir, 'Content');
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
     * Get the target of {BoilerPlate}.
     * @returns {string} Type of {BoilerPlate}
     */
    get target() { return this.#target; }

    /**
     * Get the framework of {BoilerPlate}
     * @returns {string} Type of {BoilerPlate}
     */
    get framework() { return this.#framework; }

    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     * @returns {string} Type of {BoilerPlate}
     */
    get parent() { return this.#parent; }
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
     * Whether or not this boilerplate is the boilerplate of an interaction layer
     *
     * @returns {boolean} 
     * @memberof BoilerPlate
     */
    isInteractionLayer() {
        return this.#type === 'interaction';
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