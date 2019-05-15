/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BaseBoilerplate, Boilerplate, ICanManageBoilerplates } from "./internal";

/**
 * Responsible for the boilerplate managers
 *
 * @export
 * @interface IBoilerplateManagers
 */
export interface IBoilerplateManagers {
    /**
     * The boilerplate managers
     *
     * @type {ICanManageBoilerplates[]}
     * @memberof IBoilerplateManagers
     */
    readonly managers: ICanManageBoilerplates[] 
    /**
     * Get all boiler plates
     *
     * @type {BaseBoilerplate[]}
     * @memberof IBoilerplateManagers
     */
    readonly boilerplates: BaseBoilerplate[];
    /**
     * Adds managers
     *
     * @param {...ICanManageBoilerplates[]} managers
     * @memberof IBoilerplateManagers
     */
    addManagers(...managers: ICanManageBoilerplates[]): void
    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the language
     * @memberof IBoilerplateManagers
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the type
     * @memberof IBoilerplateManagers
     */
    boilerplatesByType(type: string, namespace?: string): BaseBoilerplate[];

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace=undefined]
     * @returns {BaseBoilerplate[]} Available boiler plates for the language
     * @memberof IBoilerplateManagers
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
     * @memberof IBoilerplateManagers
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): Boilerplate[]
     /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {BaseBoilerplate} boilerplate
     * @returns {Boilerplate[]}
     * @memberof IBoilerplateManagers
     */
    getAdornmentsForBoilerplate(boilerplate: BaseBoilerplate, namespace?: string): Boilerplate[]
}
