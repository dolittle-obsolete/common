/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate, NonArtifactsBoilerplate, ICanManageBoilerplates } from "./index";

/**
 * Defines a system that's responsible for the boilerplate managers
 *
 * @export
 * @interface IBoilerplateManagers
 */
export interface IBoilerplateManagers {
    
    /**
     * The boilerplate managers
     *
     * @type {ICanManageBoilerplates[]}
     */
    readonly managers: ICanManageBoilerplates[] 

    /**
     * Get all boiler plates
     *
     * @type {Boilerplate[]}
     */
    readonly boilerplates: Boilerplate[]

    /**
     * Adds managers
     *
     * @param {...ICanManageBoilerplates[]} managers
     */
    add(...managers: ICanManageBoilerplates[]): void

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    boilerplatesByLanguage(language: string, namespace?: string): Boilerplate[]

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the type
     */
    boilerplatesByType(type: string, namespace?: string): Boilerplate[]

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    boilerplatesByLanguageAndType(language: string, type: string, namespace?: string): Boilerplate[]

     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @param {string} [namespace=undefined]
     * @returns {NonArtifactsBoilerplate[]}
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): NonArtifactsBoilerplate[]

     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {Boilerplate} boilerplate
     * @returns {NonArtifactsBoilerplate[]}
     */
    getAdornmentsForBoilerplate(boilerplate: Boilerplate, namespace?: string): NonArtifactsBoilerplate[]
}
