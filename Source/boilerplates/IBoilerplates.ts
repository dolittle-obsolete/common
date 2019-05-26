/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate, NonArtifactsBoilerplate } from "./index";

/**
 * Defines a system that's responsible for managing boilerplates and creating them
 *
 * @export
 * @interface IBoilerplates
 */
export interface IBoilerplates {

     /**
     * Get all boiler plates
     *
     * @type {Boilerplate[]}
     */
    boilerplates: Boilerplate[];

    /**
     * Whether or not there exists any boiler plates
     *
     * @type {boolean}
     */
    hasBoilerplates: boolean;

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    byLanguage(language: string, namespace?: string): Boilerplate[];

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the type
     */
    byType(type: string, namespace?: string): Boilerplate[];

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    byLanguageAndType(language: string, type: string, namespace?: string): Boilerplate[];

     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @param {string} [namespace=undefined]
     * @returns {NonArtifactsBoilerplate[]}
     */
    adornmentsFor(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): NonArtifactsBoilerplate[]

     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {Boilerplate} boilerplate
     * @returns {NonArtifactsBoilerplate[]}
     */
    adornmentsForBoilerplate(boilerplate: Boilerplate, namespace?: string): NonArtifactsBoilerplate[]

    /**
     * Create a boilerplate into a specific destination folder with a given context
     *
     * @param {NonArtifactsBoilerplate} boilerplate
     * @param {string} destination
     * @param {any} context
     */
    create(boilerplate: NonArtifactsBoilerplate, destination: string, context: any): void
}
