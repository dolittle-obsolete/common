/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function applicationFromJson(obj, path) {
    return new Application(obj.id, obj.name, path);
}
/**
 * Represents the definition of an application
 */
export class Application {
    #id;
    #name;
    #path;
    /**
     * Initializes a new instance of {Application}
     * @param {string} id Unique identifier for application
     * @param {string} name Name of application
     * @param {string} path Path of application configuration file
     */
    constructor(id, name, path) {
        this.#id = id;
        this.#name = name;
        #this.#path = path;
    }

    /**
     * Gets the unique identifier for the application
     * @returns {string} Global unique identifier
     */
    get id() {
        return this.#id;
    }

    /**
     * Gets the name of the application
     * @returns {string} Name of the application
     */
    get name() {
        return this.#name;
    }
    /**
      * Gets the path of the application configuration file
      * @returns {string}
      */
     get path() {
        return this.#path;
    }
}