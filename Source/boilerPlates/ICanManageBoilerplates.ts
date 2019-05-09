/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/


import { BaseBoilerplate } from "./BaseBoilerplate";
import { Boilerplate } from "./Boilerplate";
/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export interface ICanManageBoilerplates {
     /**
     * Get all boiler plates
     *
     * @returns {BaseBoilerplate[]}
     * @memberof ICanManageDependencies
     */
    boilerplates(): BaseBoilerplate[];

    /**
     * Whether or not there exists any boiler plates
     *
     * @returns {boolean}
     * @memberof ICanManageDependencies
     */
    hasBoilerplates(): boolean;

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     * @memberof ICanManageDependencies
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the type
     * @memberof ICanManageDependencies
     */
    boilerplatesByType(type: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]} Available boiler plates for the language
     * @memberof ICanManageDependencies
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
     * @memberof BoilerplatesManager
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): Boilerplate[]
     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {BaseBoilerplate} boilerplate
     * @returns {Boilerplate[]}
     * @memberof BoilerplatesManager
     */
    getAdornmentsForBoilerplate(boilerplate: BaseBoilerplate, namespace?: string): Boilerplate[]
}