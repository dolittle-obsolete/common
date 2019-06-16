/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '@dolittle/tooling.common.dependencies';
import { ITemplatesBoilerplate } from '../index';

/**
 * Defines a template
 */
export interface ITemplate
{
    /**
     * The name of the template
     *
     * @type {string}
     */
    readonly name: string

    /**
     * The type of the template
     *
     * @type {string}
     */
    readonly type: string

    /**
     * The area of the template.
     *
     * @type {string}
     */
    readonly area: string

    /**
     * The description of the template
     *
     * @type {string}
     */
    readonly description: string

    /**
     * Gets the dependencies of the template
     *
     * @type {Dependency[]}
     */
    readonly dependencies: IDependency[]

    /**
     * The list of files that needs to be templated
     *
     * @type {string[]}
     */
    readonly includedFiles: string[]

    /**
     * Gets the path of the template file
     *
     * @type {string}
     */
    readonly path: string
    
    /**
     * Gets a list of the files that needs to be created
     *
     * @type {string[]}
     */
    readonly filesToCreate: string[]
    
    /**
     * Gets all the dependencies needed to create this template
     *
     * @param {ITemplatesBoilerplate} boilerplate The boilerplate that holds this {ITemplate}
     * @returns {IDependency[]}
     */
    getAllDependencies(boilerplate: ITemplatesBoilerplate): IDependency[]
}