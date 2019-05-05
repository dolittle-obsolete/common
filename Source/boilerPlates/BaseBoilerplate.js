/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
import _path from 'path';
import {artifactsBoilerplateType} from '../artifacts/ArtifactsManager';
import { Scripts } from './Scripts';

/**
 * Represents the base representation of a boilerplate
 */
export class BaseBoilerplate {
    #_language;
    #_name;
    #_description;
    #_type;
    #_dependencies;
    #_namespace;
    #_scripts;
    #_contentDirectory;
    #_path;
    /**
     * Initializes a new instance of {BaseBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path 
     */
    constructor(language, name, description, type, dependencies, namespace, scripts, path, ) {
        this.#_language = language;
        this.#_name = name;
        this.#_description = description;
        this.#_type = type;
        this.#_dependencies = dependencies;
        this.#_namespace = namespace;
        this.#_scripts = scripts;
        this.#_path = path;
        this.#_contentDirectory = _path.join(getFileDirPath(path), 
            type === artifactsBoilerplateType? 
                'Templates' 
                : 'Content');
    }
    /**
     * Get the name of the {BaseBoilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get name() { return this.#_name; }

    /**
     * Get the language of the {BaseBoilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get language() { return this.#_language; }

    /**
     * Get the description of the {BaseBoilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get description() { return this.#_description; }

    /**
     * Get the type of {Boilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get type() { return this.#_type; }
    /**
     * Gets all the dependencies of the {BaseBoilerplate}
     * @type {Dependency[]}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get dependencies() { return this.#_dependencies; }
    /**
     * Gets the namespace of the {BaseBoilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get namespace() {return this.#_namespace; }
    /**
     * Gets the scripts of the {BaseBoilerplate}
     * @type {Scripts}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get scripts() {return this.#_scripts;}

    /**
     * Get the file path of the boilerplate configuration file
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get path() { return this.#_path; }

    /**
     * Gets the path of the directory of the boilerplate files 
     *
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get contentDirectory() {
        return this.#_contentDirectory;
    }
    /**
     * Whether or not this {BaseBoilerplate} is the {BaseBoilerplate} of an {InteractionLayer}
     *
     * @returns {boolean} 
     * @memberof BaseBoilerplate
     */
    isInteractionLayer() {
        return this.#_type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {BaseBoilerplate} boilerplate
     * @returns {boolean}
     * @memberof BaseBoilerplate
     */
    equals(boilerplate) {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}