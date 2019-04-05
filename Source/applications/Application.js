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
    #_id;
    #_name;
    #_path;
    /**
     * Initializes a new instance of {Application}
     * @param {string} id Unique identifier for application
     * @param {string} name Name of application
     * @param {string} path Path of application configuration file
     */
    constructor(id, name, path) {
        this.#_id = id;
        this.#_name = name;
        this.#_path = path;
    }

    /**
     * Gets the unique identifier for the application
     * @type {string}
     * @readonly
     * @memberof Application
     */
    get id() {
        return this.#_id;
    }

    /**
     * Gets the name of the application
     * @type {string}
     * @readonly
     * @memberof Application
     */
    get name() {
        return this.#_name;
    }
    /**
      * Gets the path of the application configuration file
      * @type {string}
      * @readonly
      * @memberof Application
      */
     get path() {
        return this.#_path;
    }
}