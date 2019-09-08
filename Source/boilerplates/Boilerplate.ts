/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencies } from '@dolittle/tooling.common.dependencies';
import { Scripts, IBoilerplate } from './index';

/**
 * Represents a implementation of {IBoilerplate}
 */
export abstract class Boilerplate implements IBoilerplate {
    
    /**
     * Instantiates a new instance of {Boilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {IDependencies} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path 
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: IDependencies, namespace: string, scripts: Scripts, contentDirectory: string) {
        this.language = language;
        this.name = name;
        this.description = description;
        this.type = type;
        this.dependencies = dependencies;
        this.namespace = namespace;
        this.scripts = scripts;
        this.contentDirectory = contentDirectory;
    }

    readonly name: string;

    readonly language: string;

    readonly description: string;

    readonly type: string;

    readonly dependencies: IDependencies;

    readonly namespace: string;

    readonly scripts: Scripts;

    readonly contentDirectory: string;

    /**
     * Whether or not this {BaseBoilerplate} is the {BaseBoilerplate} of an {InteractionLayer}
     *
     * @returns {boolean} 
     */
    isInteractionLayer() {
        return this.type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {IBoilerplate} boilerplate
     * @returns {boolean}
     */
    equals(boilerplate: IBoilerplate) {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}