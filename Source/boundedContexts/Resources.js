import { resourceTypeImplementationFromJson, ResourceTypeImplementation } from "./ResourceTypeImplementation";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function resourcesFromJson(obj) {
    return new Resources(resourceTypeImplementationFromJson(obj.readModels), resourceTypeImplementationFromJson(obj.eventStore));
}
/**
  * Represents a Bounded Context's resources configuration
  */
export class Resources
{
    #_readModels;
    #_eventStore;
    
    /**
      * Instantiates an instance of {Resources}
      * @param {ResourceTypeImplementation} readModels 
      * @param {ResourceTypeImplementation} eventStore
      */
    constructor (readModels, eventStore) {
        this.#_readModels = readModels;
        this.#_eventStore = eventStore;
        
    }
    /**
     * Gets the resource type implementations for read models
     * 
     * @type {ResourceTypeImplementation}
     * @readonly
     * @memberof Core
     */
    get readModels() {
        return this.#_readModels;
    }
    /**
     * The entry point of the bounded context's Core.  A relative path to the folder
     *
     * @type {ResourceTypeImplementation}
     * @readonly
     * @memberof Core
     */
    get eventStore() {
        return this.#_eventStore;
    }

    toJson() {
        return {
            readModels: this.readModels.toJson(),
            eventStore: this.eventStore.toJson()
        };
    }
}