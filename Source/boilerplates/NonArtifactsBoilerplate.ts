/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '@dolittle/tooling.common.dependencies';
import { Boilerplate, Scripts } from './index';

/**
 * Represents the standard, non-artifacts, boilerplate 
 */
export class NonArtifactsBoilerplate extends Boilerplate {

    readonly contentDirectoryName = 'Content';
    /**
     * Instantiates an instance of {NonArtifactsBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {IDependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} target
     * @param {string} framework
     * @param {{name: string, type: string, language: string}} parent
     * @param {string} path 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: IDependency[], namespace: string, 
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
 
     */
    readonly target: string;

    /**
     * Get the framework of {Boilerplate}
     *
     * @type {string}
     */
    readonly framework: string;

    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     *
     * @type {{name: string, type: string, language: string}}
     */
    readonly parent: {name: string, type: string, language: string};

    /**
     * Get the paths that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     */
    readonly pathsNeedingBinding: string[];

    /**
     * Gets the files that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     */
    readonly filesNeedingBinding: string[];
}