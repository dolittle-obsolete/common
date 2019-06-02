/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { BoundedContext } from "@dolittle/tooling.common.configurations";
import { Dependency } from "@dolittle/tooling.common.dependencies";
import { ContentBoilerplate, CreatedBoundedContextDetails } from "../index";

/**
 * Defines a system for managing bounded contexts boilerplates
 *
 * @export
 * @interface BoundedContextsManager
 */
export interface IBoundedContextsManager {
    
    /**
     * Gets all the application boilerplates 
     *
     * @type {ContentBoilerplate[]}
     */
    boilerplates: ContentBoilerplate[]

    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext | null} the bounded context
     */
    getNearestBoundedContextConfig(startPath: string): BoundedContext | null

    /**
     * Check if a bounded context configuration can be found in the given directory.
     * @param {string} folder The directory path to search
     * @returns {boolean} Whether or not the bounded context configuration was found
     */
    hasBoundedContext(folder: string): boolean

    /**
     * Retrieves the boilerplate configurations for bounded context with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {ContentBoilerplate[]} The bounded context {Boilerplate} with of the given language
     */
    boilerplatesByLanguage(language: string, namespace?: string): ContentBoilerplate[]

    /**
     * Gets the adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {ContentBoilerplate[]}
     */
    getAdornments(language?: string , boilerplateName?: string, namespace?: string): ContentBoilerplate[]

    /**
     * Gets the interaction adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {ContentBoilerplate[]}
     */
    getInteractionLayers(language?: string, boilerplateName?: string, namespace?: string): ContentBoilerplate[]

    /**
     * Create dependencies used for prompting the user for bounded context adornment
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     */
    createAdornmentDependencies(language?: string, boilerplateName?: string, namespace?: string): Dependency[]
    
    /**
     * Create dependencies used for prompting the user for interaction layers
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     */
    createInteractionDependencies(language: string, boilerplateName?: string, namespace?: string): Dependency[]

    /**
     * Creates a dolittle bounded context.
     * 
     * Interaction layers will be created as well if the dependencies are supplied in the context object.
     *
     * @param {any} context The template context
     * @param {ContentBoilerplate} boilerplate The Bounded Context Boilerplate
     * @param {string} destinationPath The absolute path of the destination of the bounded context
     * @param {string} [namespace=undefined]
     * @returns {CreatedBoundedContextDetails[]} Returns the created boilerplates with destination
     */
    create(context: any, boilerplate: ContentBoilerplate, destinationPath: string, namespace?: string): CreatedBoundedContextDetails[]

    /**
     * Creates an interaction layer and adds it to the bounded context by finding it in the folder.
     * 
     * Use addInteractionLayerToBoundedContext if you need to add multiple interaction layers
     *
     * @param {*} context
     * @param {ContentBoilerplate} boilerplate
     * @param {string} boundedContextFolder
     * @param {string} entryPoint
     */
    addInteractionLayer(context: any, boilerplate: ContentBoilerplate, boundedContextFolder: string, entryPoint: string): void

    /**
     * Creates an interaction layer, adds it to the bounded context and returns the bounded context object
     *
     * @param {*} context
     * @param {ContentBoilerplate} boilerplate
     * @param {BoundedContext} boundedContext
     * @param {string} entryPoint
     * @returns {BoundedContext}
     */
    addInteractionLayerToBoundedContext(context: any, boilerplate: ContentBoilerplate, boundedContext: BoundedContext, entryPoint: string): BoundedContext
    
}