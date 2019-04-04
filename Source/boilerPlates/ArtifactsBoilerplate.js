/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../dependencies/Dependency';
import { BaseBoilerplate } from './BaseBoilerplate';

/**
 * Represents a boilerplate for artifacts
 */
export class ArtifactsBoilerplate extends BaseBoilerplate{
    
    /**
     * Initializes a new instance of {ArtifactsBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {Dependency[]} dependencies
     * @param {string} path 
     */
    constructor(language, name, description, type, dependencies, path) {
        super(language, name, description, type, dependencies, path);
        //TODO: Set properties specific to artifacts boilerplates. e.g List of artifact templates, paths, ... This also affects ArtifactsManager, can be simplified 
    }

   
}