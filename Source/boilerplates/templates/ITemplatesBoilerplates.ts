/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ITemplate, ITemplatesBoilerplate, CreatedTemplateDetails, IBoilerplates } from "../index";

/**
 * Defines a system that knows about (ITemplatesBoilerplate) and can create an {ITemplate}
 *
 * @export
 * @interface ITemplatesBoilerplates
 */
export interface ITemplatesBoilerplates extends IBoilerplates {

    /**
     * Gets all the {ITemplate} instances
     *
     * @type {ITemplate[]}
     */
    readonly templates: ITemplate[]

    /**
     * Gets all templates for a specific language
     *
     * @param {string} language
     * @returns {ITemplate[]}
     */
    templatesByLanguage(language: string): ITemplate[]


    /**
     * Gets all templates for a specific template type
     *
     * @param {string} templateType
     * @returns {ITemplate[]}
     */
    templatesByType(templateType: string): ITemplate[]

    /**
     * Gets all templates for a specific language and type
     *
     * @param {string} language
     * @param {string} templateType
     * @returns {ITemplate[]}
     */
    templatesByLanguageAndType(language: string, templateType: string): ITemplate[]
    
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