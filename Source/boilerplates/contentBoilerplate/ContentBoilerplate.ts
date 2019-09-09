/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDependencies } from '@dolittle/tooling.common.dependencies';
import { Boilerplate, Scripts, IContentBoilerplate } from '../index';

/**
 * Represents the implementation of {IContentBoilerplate}
 */
export class ContentBoilerplate extends Boilerplate implements IContentBoilerplate {

    /**
     * Instantiates an instance of {ContentBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {IDependencies} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} target
     * @param {string} framework
     * @param {{name: string, type: string, language: string}} parent
     * @param {string} contentDirectory 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: IDependencies, namespace: string, 
        scripts: Scripts, target: string, framework: string, parent: { name: string; type: string; language: string; }, 
        contentDirectory: string, pathsNeedingBinding: string[], filesNeedingBinding: string[]) {
            super(language, name, description, type, dependencies, namespace, scripts, contentDirectory);
            this.target = target;
            this.framework = framework;
            this.parent = parent;
            this.pathsNeedingBinding = pathsNeedingBinding || [];
            this.filesNeedingBinding = filesNeedingBinding || [];
    }
    

    readonly target: string;

    readonly framework: string;

    readonly parent: {name: string, type: string, language: string};

    readonly pathsNeedingBinding: string[];

    readonly filesNeedingBinding: string[];
}