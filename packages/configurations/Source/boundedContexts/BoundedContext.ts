/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Core } from './Core';
import { InteractionLayer } from './InteractionLayer';
import { Resources } from './Resources';

export const boundedContextFileName = 'bounded-context.json';
/**
 * Represents the configuration of a Bounded Context
 *
 * @export
 * @class BoundedContext
 */
export class BoundedContext
{
   /**
    * Creates a {BoundedContext} object 
    *
    * @static
    * @param {*} obj The raw bounded-context.json object
    * @param {string} path The file path of the bounded-context.json 
    * @returns {BoundedContext} 
    * @memberof BoundedContext
    */
    static fromJson(obj: any, path: string): BoundedContext {
      return new BoundedContext(obj.application, obj.boundedContext, obj.boundedContextName, Resources.fromJson(obj.resources), Core.fromJson(obj.core), 
          obj.interaction? obj.interaction.forEach((interactionLayer: any) => InteractionLayer.fromJson(interactionLayer)) : [], path);
    } 
    /**
      * Instantiates an instance of {BoundedContext}
      * @param {string} application 
      * @param {string} boundedContext 
      * @param {string} boundedContextName
      * @param {Resources} resources 
      * @param {Core} core
      * @param {InteractionLayer[]} interactionLayers
      * @param {string} path
      */
    constructor (application: string, boundedContext: string, boundedContextName: string, resources: Resources, 
                core: Core, interactionLayers: InteractionLayer[], path: string) {
        this.application = application;
        this.boundedContext = boundedContext;
        this.boundedContextName = boundedContextName;
        this.resources = resources;
        this.core = core;
        this.interactionLayers = interactionLayers;
        this.path = path;
    }

    /**
     * The application GUID
     *
     * @type {string}
     * @memberof BoundedContext
     */
    readonly application: string;
    
    /**
     * The bounded context GUID
     *
     * @type {string}
     * @memberof BoundedContext
     */
    readonly boundedContext: string;

    /**
     * The name of the bounded context
     *
     * @type {string}
     * @memberof BoundedContext
     */
    readonly boundedContextName: string;

    /**
     * The core configuration 
     *
     * @type {Core}
     * @memberof BoundedContext
     */
    readonly core: Core;

    /**
     * The interaction layers
     *
     * @type {InteractionLayer[]}
     * @memberof BoundedContext
     */
    readonly interactionLayers: InteractionLayer[];

    /**
     * The resources configuration
     *
     * @type {Resources}
     * @memberof BoundedContext
     */
    readonly resources: Resources;

    /**
     * The path of the bounded context configuration file
     *
     * @type {string}
     * @memberof BoundedContext
     */
    readonly path: string;

    /**
     * Adds an interaction layer 
     *
     * @param {InteractionLayer} interactionLayer
     * @memberof BoundedContext
     */
    addInteractionLayer(interactionLayer: InteractionLayer) {
        this.interactionLayers.push(interactionLayer);
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