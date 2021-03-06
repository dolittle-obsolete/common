/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const applicationFilename = 'application.json';

/**
 * Represents an application configuration
 *
 * @export
 * @class Application
 */
export class Application {

    /**
     * Creates and returns a new {Application}
     *
     * @static
     * @param {*} obj
     * @param {string} path
     * @returns {Application}
     */
    static fromJson(obj: any, path: string): Application {
        return new Application(obj.id, obj.name, path);
    }

    /**
     * Instantiates a new instance of {Application}
     * @param {string} id Unique identifier for application
     * @param {string} name Name of application
     * @param {string} path Path of application configuration file
     */
    constructor(id: string, name: string, path: string) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    /**
     * Gets the unique identifier for the application
     * @type {string}
     * @readonly
     */
    readonly id: string;

    /**
     * Gets the name of the application
     * @type {string}
     * @readonly
     */
    readonly name: string;

    /**
     * Gets the path of the application configuration file
     * @type {string}
     * @readonly
     */
    readonly path: string;
}
