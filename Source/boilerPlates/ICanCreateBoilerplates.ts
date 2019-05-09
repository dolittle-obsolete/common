/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate } from "./Boilerplate";

/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export interface ICanCreateBoilerplates {
      /**
     * Create an instance of {Boilerplate} into a specific destination folder with a given context
     * @param {Boilerplate} boilerplate 
     * @param {string} destination 
     * @param {any} context
     */
    createBoilerplate(boilerplate: Boilerplate, destination: string, context: any): void
}