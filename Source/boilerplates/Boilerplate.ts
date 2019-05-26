/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '@dolittle/tooling.common.dependencies';
import { getFileDirPath } from '@dolittle/tooling.common.utilities';
import _path from 'path';
import { artifactsBoilerplateType, Scripts } from './index';

/**
 * Represents the base representation of a boilerplate
 */
export abstract class Boilerplate {
    
    /**
     * Instantiates a new instance of {Boilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {IDependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path 
     */
    constructor(language: string, name: string, description: string, type: string, dependencies: IDependency[], namespace: string, scripts: Scripts, path: string) {
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
    abstract static folderContentName: string;
    /**
     * The name of the {BaseBoilerplate}
     *
     * @type {string}
 
     */
    readonly name: string;

    /**
     * The language of the {BaseBoilerplate}
     *
     * @type {string}
     */
    readonly language: string;

    /**
     * The description of the {BaseBoilerplate}
     *
     * @type {string}
     */
    readonly description: string;

    /**
     * The type of {BaseBoilerplate}
     *
     * @type {string}
     */

    readonly type: string;

    /**
     * The dependencies of the {BaseBoilerplate}
     *
     * @type {IDependency[]}
     */
    readonly dependencies: IDependency[];

    /**
     * The namespace of the {BaseBoilerplate}
     *
     * @type {string}
     */
    readonly namespace: string;

    /**
     * The scripts of the {BaseBoilerplate}
     *
     * @type {Scripts}
     */
    readonly scripts: Scripts;

    /**
     * The path of the directory of the boilerplate files 
     *
     * @type {string}
     */
    readonly contentDirectory: string;
    
    /**
     * The file path of the boilerplate configuration file
     *
     * @type {string}
     */
    readonly path: string;

    /**
     * Whether or not this {BaseBoilerplate} is the {BaseBoilerplate} of an {InteractionLayer}
     *
     * @returns {boolean} 
     */
    isInteractionLayer(): boolean {
        return this.type === 'interaction';
    }   

    /**
     * Check if this is equal to boilerplate
     *
     * @param {Boilerplate} boilerplate
     * @returns {boolean}
 
     */
    equals(boilerplate: Boilerplate): boolean {
        return this.language === boilerplate.language
                && this.name === boilerplate.name
                && this.type === boilerplate.type;
         
    }
}