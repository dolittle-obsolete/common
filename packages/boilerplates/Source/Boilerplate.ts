/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BaseBoilerplate } from './BaseBoilerplate';
import { Scripts } from './Scripts';
import { Dependency } from '@dolittle/tooling.common.dependencies/Dependency';

export const boilerplateContentFolderName = 'Content';
/**
 * Represents the standard boilerplate, meaning a non-artifacts boilerplate 
 */
export class Boilerplate extends BaseBoilerplate {

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
    constructor(language: string, name: string, description: string, type: string, dependencies: Dependency[], namespace: string, 
        scripts: Scripts, target: string, framework: string, parent: { name: string; type: string; language: string; }, 
        path: string, pathsNeedingBinding: string[], filesNeedingBinding: string[]) {
    super(language, name, description, type, dependencies, namespace, scripts, path);
    this.target = target;
    this.framework = framework;
    this.parent = parent;
    this.pathsNeedingBinding = pathsNeedingBinding || [];
    this.filesNeedingBinding = filesNeedingBinding || [];
    }
    /**
     * Get the target of {Boilerplate}.
     *
     * @type {string}
     * @memberof Boilerplate
     */
    readonly target: string;
    /**
     * Get the framework of {Boilerplate}
     *
     * @type {string}
     * @memberof Boilerplate
     */
    readonly framework: string;
    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     *
     * @type {{name: string, type: string, language: string}}
     * @memberof Boilerplate
     */
    readonly parent: {name: string, type: string, language: string};
    /**
     * Get the paths that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     * @memberof Boilerplate
     */
    readonly pathsNeedingBinding: string[];
    /**
     * Gets the files that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     * @memberof Boilerplate
     */
    readonly filesNeedingBinding: string[];
}