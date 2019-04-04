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
    #_application;
    #_boundedContext;
    #_boundedContextName;
    #_core;
    #_interactionLayers;
    #_resources;
    #_path;
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
        this.#_application = application;
        this.#_boundedContext = boundedContext;
        this.#_boundedContextName = boundedContextName;
        this.#_resources = resources;
        this.#_core = core;
        this.#_interactionLayers = interactionLayers;
        this.#_path = path;
        
    }
    /**
      * Gets the application GUID
      * @returns {string} The GUID of the Application
      */
    get application() {
        return this.#_application;
    }
    /**
      * Gets the bounded context GUID
      * @returns {string} The GUID of the bounded context
      */
    get boundedContext() {
        return this.#_boundedContext;
    }
    /**
      * Gets the name of the bounded context
      * @returns {string} Bounded Context name
      */
    get boundedContextName() {
        return this.#_boundedContextName;
    }
    /**
      * Gets the core configuration 
      * @returns {Core}
      */
    get core() {
        return this.#_core;
    }
    /**
     * Gets the interaction layers
     *
     * @type {InteractionLayer[]}
     * @readonly
     * @memberof BoundedContext
     */
    get interactionLayers() {
      return this.#_interactionLayers;
    }
    /**
     * Gets the resources configuration
     *
     * @type {Resources}
     * @readonly
     * @memberof BoundedContext
     */
    get resources() {
      return this.#_resources;
    }
    /**
      * Gets the path of the bounded context configuration file
      * @returns {string}
      */
    get path() {
        return this.#_path;
    }
    /**
     * Adds an interaction layer 
     *
     * @param {InteractionLayer} interactionLayer
     * @memberof BoundedContext
     */
    addInteractionLayer(interactionLayer) {
        this.#_interactionLayers.push(interactionLayer);
    }
    toJson() {
        return {
            application: this.application,
            boundedContext: this.boundedContext,
            boundedContextName: this.boundedContextName,
            resources: this.resources.toJson(),
            core: this.core? this.core.toJson() : undefined,
            interaction: this.interactionLayers.map(interaction => interaction.toJson())
        };
    }
}