/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBoilerplate } from "./index";

/**
 * Defines a system that knows about {IBoilerplate}
 *
 * @export
 * @interface IBoilerplates
 */
export interface IBoilerplates {

     /**
     * Get all boilerplates
     *
     * @type {IBoilerplate[]}
     */
    readonly boilerplates: IBoilerplate[];

    /**
     * Get all boilerplates for a namespace
     * 
     * @param {string | undefined} namespace
     * @returns {IBoilerplate[]}
     */
    byNamespace(namespace: string | undefined): IBoilerplate[];

    /**
     * Get all boilerplates for a specific language
     * 
     * @param {string} language
     * @param {string} [namespace]
     * @returns {IBoilerplate[]}
     */
    byLanguage(language: string, namespace?: string): IBoilerplate[];

    /**
     * Get all boilerplates for a specific type
     * 
     * @param {string} type
     * @param {string} [namespace]
     * @returns {IBoilerplate[]}
     */
    byType(type: string, namespace?: string): IBoilerplate[];

    /**
     * Get all boilerplates for a specific language and type
     * 
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace]
     * @returns {IBoilerplate[]} 
     */
    byLanguageAndType(language: string, type: string, namespace?: string): IBoilerplate[];
}
