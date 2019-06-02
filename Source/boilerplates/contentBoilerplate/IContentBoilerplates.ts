/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IContentBoilerplate, IBoilerplates, CreatedContentBoilerplateDetails} from '../index';

/**
 * Defines a system that knows about {IContentBoilerplate}
 */
export interface IContentBoilerplates extends IBoilerplates {
    
    /**
     * Gets the adornment boilerplates for a parent boilerplate 
     *
     * @param {string} parentType
     * @param {string} [parentLanguage]
     * @param {string} [parentName]
     * @param {string} [namespace]
     * @returns {IContentBoilerplate[]}
     */
    adornmentsFor(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): IContentBoilerplate[]

    /**
     * Gets the adornment boilerplates for a parent boilerplate 
     *
     * @param {IContentBoilerplate} boilerplate
     * @param {string} [namespace]
     * @returns {IContentBoilerplate[]}
     */
    adornmentsForBoilerplate(boilerplate: IContentBoilerplate, namespace?: string): IContentBoilerplate[]

    /**
     * Creates a boilerplate at the destination
     *
     * @param {IContentBoilerplate} boilerplate
     * @param {string} destination
     * @param {*} context
     * @returns {CreatedContentBoilerplateDetails}
     */
    create(boilerplate: IContentBoilerplate, destination: string, context: any): CreatedContentBoilerplateDetails
}