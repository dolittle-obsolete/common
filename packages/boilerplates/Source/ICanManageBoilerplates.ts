/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BaseBoilerplate, Boilerplate } from "./internal";

/**
 * Responsible for managing boilerplates
 *
 * @export
 * @interface ICanManageBoilerplates
 */
export interface ICanManageBoilerplates {
     /**
     * Get all boiler plates
     *
     * @type {BaseBoilerplate[]}
     * @memberof ICanManageBoilerplates
     */
    boilerplates: BaseBoilerplate[];

    /**
     * Whether or not there exists any boiler plates
     *
     * @type {boolean}
     * @memberof ICanManageBoilerplates
     */
    hasBoilerplates: boolean;

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the language
     * @memberof ICanManageBoilerplates
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the type
     * @memberof ICanManageBoilerplates
     */
    boilerplatesByType(type: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the language
     * @memberof ICanManageBoilerplates
     */
    boilerplatesByLanguageAndType(language: string, type: string, namespace?: string): BaseBoilerplate[];

     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]}
     * @memberof ICanManageBoilerplates
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): Boilerplate[]
     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {BaseBoilerplate} boilerplate
     * @returns {Boilerplate[]}
     * @memberof ICanManageBoilerplates
     */
    getAdornmentsForBoilerplate(boilerplate: BaseBoilerplate, namespace?: string): Boilerplate[]
}
