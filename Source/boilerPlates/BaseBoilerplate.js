/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
import _path from 'path';
import artifactsBoilerplateType from '../artifacts/ArtifactsManager';

/**
 * Represents the base representation of a boilerplate
 */
export class BaseBoilerplate {
    #_language;
    #_name;
    #_description;
    #_type;
    #_dependencies;
    #_contentDirectory;
    #_path;
    /**
     * Initializes a new instance of {BaseBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} path 
     */
    constructor(language, name, description, type, dependencies, path, ) {
        this.#_language = language;
        this.#_name = name;
        this.#_description = description;
        this.#_type = type;
        this.#_dependencies = dependencies;
        this.#_path = path;
        this.#_contentDirectory = _path.join(getFileDirPath(path), type === artifactsBoilerplateType? 'Templates' : 'Content');
    }

    /**
     * Get the name of the {Boilerplate}
     * @returns {string} Name of {Boilerplate}
     */
    get name() { return this.#_name; }

    /**
     * Get the language of the {Boilerplate}
     * @returns {string} Language of the {Boilerplate}
     */
    get language() { return this.#_language; }

    /**
     * Get the description of the {Boilerplate}
     * @returns {string} Description of the {Boilerplate}
     */
    get description() { return this.#_description; }

    /**
     * Get the type of {Boilerplate}
     * @returns {string} Type of {Boilerplate}
     */
    get type() { return this.#_type; }
    /**
     * Gets all the dependencies of the boilerplate
     * @returns {Dependency[]}
     */
    get dependencies() { return this.#_dependencies; }

    /**
     * Get the file path of the {Boilerplate} configuration file
     * @returns {string}
     */
    get path() { return this.#_path; }

    /**
     * Gets the path of the directory of the boilerplate files 
     *
     * @returns {string}
     * @readonly
     * @memberof Boilerplate
     */
    get contentDirectory() {
        return this.#_contentDirectory;
    }
    /**
     * Whether or not this boilerplate is the boilerplate of an interaction layer
     *
     * @returns {boolean} 
     * @memberof Boilerplate
     */
    isInteractionLayer() {
        return this.#_type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {Boilerplate} boilerplate
     * @memberof Boilerplate
     */
    equals(boilerplate) {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}