/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { getFileDirPath } from '../helpers';
import _path from 'path';
import artifactsBoilerplateType from '../artifacts/ArtifactsManager';

/**
 * Represents a boiler plate
 */
export class Boilerplate {
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
     * Initializes a new instance of {Boilerplate}
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
        this.#contentDirectory = _path.join(dir, type === artifactsBoilerplateType? 'Templates' : 'Content');
    }

    /**
     * Get the name of the {Boilerplate}
     * @returns {string} Name of {Boilerplate}
     */
    get name() { return this.#name; }

    /**
     * Get the language of the {Boilerplate}
     * @returns {string} Language of the {Boilerplate}
     */
    get language() { return this.#language; }

    /**
     * Get the description of the {Boilerplate}
     * @returns {string} Description of the {Boilerplate}
     */
    get description() { return this.#description; }

    /**
     * Get the type of {Boilerplate}
     * @returns {string} Type of {Boilerplate}
     */
    get type() { return this.#type; }
    /**
     * Gets all the dependencies of the boilerplate
     * @returns {Dependency[]}
     */
    get dependencies() { return this.#dependencies; }

    /**
     * Get the target of {Boilerplate}.
     * @returns {string} Type of {Boilerplate}
     */
    get target() { return this.#target; }

    /**
     * Get the framework of {Boilerplate}
     * @returns {string} Type of {Boilerplate}
     */
    get framework() { return this.#framework; }

    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     * @returns {string} Type of {Boilerplate}
     */
    get parent() { return this.#parent; }
    /**
     * Get the file path of the {Boilerplate} configuration file
     * @returns {string}
     */
    get path() { return this.#path; }

    /**
     * Get the paths that need binding - relative within the content of the location of the {Boilerplate}
     * @returns {string[]} Paths
     */
    get pathsNeedingBinding() {return this.#pathsNeedingBinding; }

    /**
     * Gets the files that need binding - relative within the content of the location of the {Boilerplate}
     * @returns {string[]} Files
     */
    get filesNeedingBinding() {return this.#filesNeedingBinding; }

    /**
     * Gets the path of the directory of the boilerplate files 
     *
     * @returns {string}
     * @readonly
     * @memberof Boilerplate
     */
    get contentDirectory() {
        return this.#contentDirectory;
    }
    /**
     * Whether or not this boilerplate is the boilerplate of an interaction layer
     *
     * @returns {boolean} 
     * @memberof Boilerplate
     */
    isInteractionLayer() {
        return this.#type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {Boilerplate} boilerplate
     * @memberof Boilerplate
     */
    equals(boilerplate) {
        return this.#language === boilerplate.language
                && this.#name === boilerplate.name
                && this.#type === boilerplate.type;
         
    }
}