/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BaseBoilerplate } from "./BaseBoilerplate";

/**
 * Responsible for loading the boilerplates into the boilerplates system
 *
 * @export
 * @interface IBoilerplatesLoader
 */
export interface IBoilerplatesLoader {
    /**
     * Loads all boilerplates into the boilerplates system
     *
     * @returns {BaseBoilerplate[]}
     * @memberof IBoilerplatesLoader
     */
    load(): BaseBoilerplate[]
    
    /**
     * The loaded boilerplates
     *
     * @type {BaseBoilerplate[]}
     * @memberof IBoilerplatesLoader
     */
    loadedBoilerplates: BaseBoilerplate[]
    /**
     * The path of the boilerplates configuration
     *
     * @type {string}
     * @memberof IBoilerplatesLoader
     */
    boilerplatesPath: string
    /**
     * Whether the loader needs to load the boiler plates again
     *
     * @type {boolean}
     * @memberof IBoilerplatesLoader
     */
    needsReload: boolean
}