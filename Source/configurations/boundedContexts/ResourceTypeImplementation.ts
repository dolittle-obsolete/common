/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a Bounded Context's resources type implementation configuration
 * 
 * @export
 * @class ResourceTypeImplementation
 */
export class ResourceTypeImplementation
{

    /**
     * Creates a {ResourceTypeImplementation}
     *
     * @static
     * @param {any} obj The resource type implementation object of a Resource from within the bounded-context.json
     * @returns {ResourceTypeImplementation}
     */
    static fromJson(obj: any): ResourceTypeImplementation {
        return new ResourceTypeImplementation(obj.development, obj.production);
    }

    /**
     * Instantiates an instance of {ResourceTypeImplementation}
     * @param {string} development 
     * @param {string} production
     */
    constructor (development: string, production: string) {
        this.development = development;
        this.production = production;
    }

    /**
     * The resource type implementations for read models
     *
     * @type {string}
     */
    readonly development: string;

    /**
     * The entry point of the bounded context's Core.  A relative path to the folder
     *
     * @type {string}
     */
    readonly production: string;

    toJson() {
        return {
            development: this.development,
            production: this.production
        };
    }
}