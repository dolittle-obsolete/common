/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { BaseBoilerplate } from './BaseBoilerplate';
import { Scripts } from './Scripts';

export const boilerplateContentFolderName = 'Content';
/**
 * Represents the standard boilerplate, meaning a non-artifacts boilerplate 
 */
export class Boilerplate extends BaseBoilerplate {
    #_target;
    #_framework;
    #_parent;
    #_pathsNeedingBinding;
    #_filesNeedingBinding;
    /**
     * Initializes a new instance of {Boilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} target
     * @param {string} framework
     * @param {{name: string, type: string, language: string}} parent
     * @param {string} path 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language, name, description, type, dependencies, namespace, scripts, target, framework, parent, path, pathsNeedingBinding, filesNeedingBinding) {
        super(language, name, description, type, dependencies, namespace, scripts, path);
        this.#_target = target;
        this.#_framework = framework;
        this.#_parent = parent;
        this.#_pathsNeedingBinding = pathsNeedingBinding || [];
        this.#_filesNeedingBinding = filesNeedingBinding || [];
    }

    /**
     * Get the target of {Boilerplate}.
     * @type {string}
     * @readonly
     * @memberof Boilerplate
     */
    get target() { return this.#_target; }

    /**
     * Get the framework of {Boilerplate}
     * @type {string}
     * @readonly
     * @memberof Boilerplate
     */
    get framework() { return this.#_framework; }

    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     * @type {{name: string, type: string, language: string}}
     * @readonly
     * @memberof Boilerplate
     */
    get parent() { return this.#_parent; }

    /**
     * Get the paths that need binding - relative within the content of the location of the {Boilerplate}
     * @type {string[]}
     * @readonly
     * @memberof Boilerplate
     */
    get pathsNeedingBinding() {return this.#_pathsNeedingBinding; }

    /**
     * Gets the files that need binding - relative within the content of the location of the {Boilerplate}
     * @type {string[]}
     * @readonly
     * @memberof Boilerplate
     */
    get filesNeedingBinding() {return this.#_filesNeedingBinding; }
}