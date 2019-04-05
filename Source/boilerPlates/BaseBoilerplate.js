/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
import _path from 'path';
import artifactsBoilerplateType from '../artifacts/ArtifactsManager';
import { artifactsBoilerplateContentFolderName } from './ArtifactsBoilerplate';
import { boilerplateContentFolderName } from './Boilerplate';

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
        this.#_contentDirectory = _path.join(getFileDirPath(path), 
            type === artifactsBoilerplateType? 
                artifactsBoilerplateContentFolderName 
                : boilerplateContentFolderName);
    }
    /**
     * Get the name of the {Boilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get name() { return this.#_name; }

    /**
     * Get the language of the {Boilerplate}
     * @type {string}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get language() { return this.#_language; }

    /**
     * Get the description of the {Boilerplate}
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
     * Gets all the dependencies of the boilerplate
     * @type {Dependency[]}
     * @readonly
     * @memberof BaseBoilerplate
     */
    get dependencies() { return this.#_dependencies; }

    /**
     * Get the file path of the {Boilerplate} configuration file
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
     * @returns {boolean}
     * @memberof Boilerplate
     */
    equals(boilerplate) {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}