/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IContentBoilerplate, IBoilerplates, CreatedContentBoilerplateDetails } from '../internal';

/**
 * Defines a system that knows about {IContentBoilerplate}
 */
export interface IContentBoilerplates extends IBoilerplates {

    /**
     * Get all boilerplates
     *
     * @type {IContentBoilerplate[]}
     */
    readonly boilerplates: IContentBoilerplate[];

    /**
     * Get all boilerplates for a namespace
     *
     * @param {string | undefined} namespace
     * @returns {IContentBoilerplate[]}
     */
    byNamespace(namespace: string | undefined): IContentBoilerplate[];

    /**
     * Get all boilerplates for a specific language
     *
     * @param {string} language
     * @param {string} [namespace]
     * @returns {IContentBoilerplate[]}
     */
    byLanguage(language: string, namespace?: string): IContentBoilerplate[];

    /**
     * Get all boilerplates for a specific type
     *
     * @param {string} type
     * @param {string} [namespace]
     * @returns {IContentBoilerplate[]}
     */
    byType(type: string, namespace?: string): IContentBoilerplate[];

    /**
     * Get all boilerplates for a specific language and type
     *
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace]
     * @returns {IContentBoilerplate[]}
     */
    byLanguageAndType(language: string, type: string, namespace?: string): IContentBoilerplate[];

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
    create(boilerplate: IContentBoilerplate, destination: string, context: any): Promise<CreatedContentBoilerplateDetails>
}
