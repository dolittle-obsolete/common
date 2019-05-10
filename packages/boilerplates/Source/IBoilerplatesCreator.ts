/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate } from "./Boilerplate";

/**
 * Responsible for creating boilerplates
 *
 * @export
 * @interface IBoilerplatesCreator
 */
export interface IBoilerplatesCreator {
    /**
     * Create a boilerplate into a specific destination folder with a given context
     *
     * @param {Boilerplate} boilerplate
     * @param {string} destination
     * @param {any} context
     * @memberof IBoilerplatesCreator
     */
    createBoilerplate(boilerplate: Boilerplate, destination: string, context: any): void

}