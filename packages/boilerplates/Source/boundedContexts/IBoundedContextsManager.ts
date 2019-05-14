/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoundedContext } from "@dolittle/tooling.common.configurations";
import { Dependency } from "@dolittle/tooling.common.dependencies";
import { Boilerplate, CreatedBoundedContextDetails } from "../internal";

/**
 * Responsible for managing bounded contexts boilerplates
 *
 * @export
 * @interface BoundedContextsManager
 */
export interface IBoundedContextsManager {
    
    /**
     * Gets all the application boilerplates 
     *
     * @type {Boilerplate[]}
     * @memberof IApplicationsManager
     */
    boilerplates: Boilerplate[]
    /**
     * Whether or not there are any application boilerplates
     *
     * @type {boolean}
     * @memberof IApplicationsManager
     */
    hasBoilerplate: boolean
    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext | null} the bounded context
     * @memberof IBoundedContextsManager
     */
    getNearestBoundedContextConfig(startPath: string): BoundedContext | null

    /**
     * Check if a bounded context configuration can be found in the given directory.
     * @param {string} folder The directory path to search
     * @returns {boolean} Whether or not the bounded context configuration was found
     * @memberof IBoundedContextManager
     */
    hasBoundedContext(folder: string): boolean

    /**
     * Retrieves the boilerplate configurations for bounded context with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {Boilerplate[]} The bounded context {Boilerplate} with of the given language
     * @memberof IBoundedContextManager
     */
    boilerplatesByLanguage(language: string, namespace?: string): Boilerplate[]
    /**
     * Gets the adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Boilerplate[]}
     * @memberof IBoundedContextManager
     */
    getAdornments(language?: string , boilerplateName?: string, namespace?: string): Boilerplate[]
    /**
     * Gets the interaction adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Boilerplate[]}
     * @memberof IBoundedContextManager
     */
    getInteractionLayers(language?: string, boilerplateName?: string, namespace?: string): Boilerplate[]
    /**
     * Create dependencies used for prompting the user for bounded context adornment
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     * @memberof IBoundedContextManager
     */
    createAdornmentDependencies(language?: string, boilerplateName?: string, namespace?: string): Dependency[]
    /**
     * Create dependencies used for prompting the user for interaction layers
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     * @memberof IBoundedContextManager
     */
    createInteractionDependencies(language: string, boilerplateName?: string, namespace?: string): Dependency[]
    /**
     * Creates a dolittle bounded context.
     * 
     * Interaction layers will be created as well if the dependencies are supplied in the context object.
     *
     * @param {any} context The template context
     * @param {Boilerplate} boilerplate The Bounded Context Boilerplate
     * @param {string} destinationPath The absolute path of the destination of the bounded context
     * @param {string} [namespace=undefined]
     * @returns {CreatedBoundedContextDetails[]} Returns the created boilerplates with destination
     * @memberof IBoundedContextManager
     */
    createBoundedContext(context: any, boilerplate: Boilerplate, destinationPath: string, namespace?: string): CreatedBoundedContextDetails[]
    /**
     * Creates an interaction layer and adds it to the bounded context by finding it in the folder.
     * 
     * Use addInteractionLayerToBoundedContext if you need to add multiple interaction layers
     *
     * @param {*} context
     * @param {Boilerplate} boilerplate
     * @param {string} boundedContextFolder
     * @param {string} entryPoint
     * @memberof BoundedContextsManager
     */
    addInteractionLayer(context: any, boilerplate: Boilerplate, boundedContextFolder: string, entryPoint: string): void
    /**
     * Creates an interaction layer, adds it to the bounded context and returns the bounded context object
     *
     * @param {*} context
     * @param {Boilerplate} boilerplate
     * @param {BoundedContext} boundedContext
     * @param {string} entryPoint
     * @returns {BoundedContext}
     * @memberof BoundedContextsManager
     */
    addInteractionLayerToBoundedContext(context: any, boilerplate: Boilerplate, boundedContext: BoundedContext, entryPoint: string): BoundedContext
    
}