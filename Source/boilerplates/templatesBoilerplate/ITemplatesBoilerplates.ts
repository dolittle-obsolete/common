/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ITemplate, IBoilerplates, CreatedTemplateDetails, ITemplatesBoilerplates, ITemplatesBoilerplate } from "../index";

/**
 * Defines a system that knows about (ITemplatesBoilerplate) and can create an {ITemplate}
 *
 * @export
 * @interface ITemplatesBoilerplates
 */
export interface ITemplatesBoilerplates extends IBoilerplates {

    /**
     * Get all boilerplates
     *
     * @type {ITemplatesBoilerplate[]}
     */
    readonly boilerplates: ITemplatesBoilerplate[];

    /**
     * Gets all the {ITemplate} instances
     *
     * @type {ITemplate[]}
     */
    readonly templates: ITemplate[]
    
    /**
     * Get all boilerplates for a namespace
     * 
     * @param {string | undefined} namespace
     * @returns {ITemplatesBoilerplate[]}
     */
    byNamespace(namespace: string | undefined): ITemplatesBoilerplate[];

    /**
     * Get all boilerplates for a specific language
     * 
     * @param {string} language
     * @param {string} [namespace]
     * @returns {ITemplatesBoilerplate[]}
     */
    byLanguage(language: string, namespace?: string): ITemplatesBoilerplate[];

    /**
     * Get all boilerplates for a specific type
     * 
     * @param {string} type
     * @param {string} [namespace]
     * @returns {ITemplatesBoilerplate[]}
     */
    byType(type: string, namespace?: string): ITemplatesBoilerplate[];

    /**
     * Get all boilerplates for a specific language and type
     * 
     * @param {string} language
     * @param {string} type
     * @param {string} [namespace]
     * @returns {ITemplatesBoilerplate[]} 
     */
    byLanguageAndType(language: string, type: string, namespace?: string): ITemplatesBoilerplate[];

    /**
     * Gets all templates for a specific template type
     *
     * @param {string} templateType
     * @param {string} [namespace]
     * @returns {ITemplate[]}
     */
    templatesByType(templateType: string, namespace?: string): ITemplate[]
    
    /**
     * Creates a template base on the {ITemplate} at the given destination
     * 
     * @param {any} context 
     * @param {ITemplate} artifactTemplate
     * @param {ITemplatesBoilerplate} boilerplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     */
    create(context: any, artifactTemplate: ITemplate, boilerplate: ITemplatesBoilerplate, destinationPath: string): CreatedTemplateDetails
}