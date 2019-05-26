/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate } from "./index";

/**
 * Defines a system that's responsible for loading the boilerplates into the boilerplates system
 *
 * @export
 * @interface IBoilerplatesLoader
 */
export interface IBoilerplatesLoader {

    /**
     * Loads all boilerplates into the boilerplates system
     *
     * @returns {Boilerplate[]}
     */
    load(): Boilerplate[]
    
    /**
     * The loaded boilerplates
     *
     * @type {Boilerplate[]}
     */
    loaded: Boilerplate[]

    /**
     * The path of the boilerplates configuration
     *
     * @type {string}
     */
    boilerplatesConfigurationPath: string

    /**
     * Whether the loader needs to load the boiler plates again
     *
     * @type {boolean}
     */
    needsReload: boolean
}