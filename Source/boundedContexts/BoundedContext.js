/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Core, coreFromJson } from './Core';
import {Resources, resourcesFromJson} from './Resources';
import { InteractionLayer, interactionLayerFromJson } from './InteractionLayer';

export function boundedContextFromJson(obj, path) {
    return new BoundedContext(obj.application, obj.boundedContext, obj.boundedContextName, resourcesFromJson(obj.resources), coreFromJson(obj.core), 
        obj.interaction? obj.interaction.forEach(interactionLayer => interactionLayerFromJson(interactionLayer)) : [], path);
}
/**
  * Represents a Bounded Context
  */
export class BoundedContext
{
    #application;
    #boundedContext;
    #boundedContextName;
    #core;
    #interactionLayers;
    #resources;
    #path;
    /**
      * Instantiates an instance of BoundedContext
      * @param {string} application 
      * @param {string} boundedContext 
      * @param {string} boundedContextName
      * @param {Resources} resources 
      * @param {Core} core
      * @param {InteractionLayer[]} interactionLayers
      * @param {string} path
      */
    constructor (application, boundedContext, boundedContextName, resources, core, interactionLayers, path) {
        this.#application = application;
        this.#boundedContext = boundedContext;
        this.#boundedContextName = boundedContextName;
        this.#resources = resources;
        this.#core = core;
        this.#interactionLayers = interactionLayers;
        this.#path = path;
        
    }
    /**
      * Gets the application GUID
      * @returns {string} The GUID of the Application
      */
    get application() {
        return this.#application;
    }
    /**
      * Gets the bounded context GUID
      * @returns {string} The GUID of the bounded context
      */
    get boundedContext() {
        return this.#boundedContext;
    }
    /**
      * Gets the name of the bounded context
      * @returns {string} Bounded Context name
      */
    get boundedContextName() {
        return this.#boundedContextName;
    }
    /**
      * Gets the core configuration 
      * @returns {Core}
      */
    get core() {
        return this.#core;
    }
    /**
     * Gets the interaction layers
     *
     * @readonly
     * @memberof BoundedContext
     */
    get interactionLayers() {
      return this.#interactionLayers;
    }
    /**
     * Gets the resources configuration
     *
     * @readonly
     * @memberof BoundedContext
     */
    get resources() {
      return this.#resources;
    }
    /**
      * Gets the path of the bounded context configuration file
      * @returns {string}
      */
    get path() {
        return this.#path;
    }

    toJson() {
        return {
            application: this.#application,
            boundedContext: this.#boundedContext,
            boundedContextName: this.#boundedContextName,
            resources: this.#resources.toJson(),
            core: this.#core? this.#core.toJson() : undefined,
            interaction: this.#interactionLayers.map(interaction => interaction.toJson())
        };
    }
}