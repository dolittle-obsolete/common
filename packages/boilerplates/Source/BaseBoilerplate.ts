/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import _path from 'path';
import {artifactsBoilerplateType} from './artifacts/ArtifactsManager';
import { Scripts } from './Scripts';
import { getFileDirPath } from '@dolittle/tooling.common.utilities/helpers';
import { Dependency } from '@dolittle/tooling.common.dependencies/Dependency';

/**
 * Represents the base representation of a boilerplate
 */
export class BaseBoilerplate {
    
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
    constructor(language: string, name: string, description: string, type: string, dependencies: Dependency[], namespace: string, scripts: Scripts, path: string) {
        this.language = language;
        this.name = name;
        this.description = description;
        this.type = type;
        this.dependencies = dependencies;
        this.namespace = namespace;
        this.scripts = scripts;
        this.path = path;
        this.contentDirectory = _path.join(getFileDirPath(path), 
            type === artifactsBoilerplateType? 
                'Templates' 
                : 'Content');
    }

    /**
     * The name of the {BaseBoilerplate}
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly name: string;
    /**
     * The language of the {BaseBoilerplate}
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly language: string;
    /**
     * The description of the {BaseBoilerplate}
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly description: string;
    /**
     * The type of {BaseBoilerplate}
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly type: string;
    /**
     * The dependencies of the {BaseBoilerplate}
     *
     * @type {Dependency[]}
     * @memberof BaseBoilerplate
     */
    readonly dependencies: Dependency[];
    /**
     * The namespace of the {BaseBoilerplate}
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly namespace: string;
    /**
     * The scripts of the {BaseBoilerplate}
     *
     * @type {Scripts}
     * @memberof BaseBoilerplate
     */
    readonly scripts: Scripts;
    /**
     * The path of the directory of the boilerplate files 
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly contentDirectory: string;
    /**
     * The file path of the boilerplate configuration file
     *
     * @type {string}
     * @memberof BaseBoilerplate
     */
    readonly path: string;

    /**
     * Whether or not this {BaseBoilerplate} is the {BaseBoilerplate} of an {InteractionLayer}
     *
     * @returns {boolean} 
     * @memberof BaseBoilerplate
     */
    isInteractionLayer(): boolean {
        return this.type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {BaseBoilerplate} boilerplate
     * @returns {boolean}
     * @memberof BaseBoilerplate
     */
    equals(boilerplate: BaseBoilerplate): boolean {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}