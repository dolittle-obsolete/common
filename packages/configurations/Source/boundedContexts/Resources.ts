/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ResourceTypeImplementation } from "./ResourceTypeImplementation";

/**
 * Represents a Bounded Context's resources configuration
 *
 * @export
 * @class Resources
 */
export class Resources
{
    /**
     * Creates {Resources}
     *
     * @static
     * @param {*} obj The resources object from within the bounded-context.json
     * @returns {Resources}
     * @memberof Resources
     */
    static fromJson(obj: any): Resources {
        return new Resources(ResourceTypeImplementation.fromJson(obj.readModels), ResourceTypeImplementation.fromJson(obj.eventStore));
    }
    
    /**
     * Instantiates an instance of {Resources}
     * @param {ResourceTypeImplementation} readModels 
     * @param {ResourceTypeImplementation} eventStore
     */
    constructor (readModels: ResourceTypeImplementation, eventStore: ResourceTypeImplementation) {
        this.readModels = readModels;
        this.eventStore = eventStore;
        
    }

    /**
     * The resource type implementations for read models
     * 
     * @type {ResourceTypeImplementation}
     * @readonly
     * @memberof Core
     */
    readonly readModels: ResourceTypeImplementation;
    
    /**
     * The entry point of the bounded context's Core.  A relative path to the folder
     *
     * @type {ResourceTypeImplementation}
     * @readonly
     * @memberof Core
     */
    readonly eventStore: ResourceTypeImplementation;

    toJson() {
        return {
            readModels: this.readModels.toJson(),
            eventStore: this.eventStore.toJson()
        };
    }
}