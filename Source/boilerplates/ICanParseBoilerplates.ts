/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson, Boilerplate } from "./index";

/**
 * Defines a system that's responsible for parsing boilerplates
 *
 * @export
 * @interface ICanParseBoilerplates
 */
export interface ICanParseBoilerplates {

    /**
     * Whether or not this boilerplate parser can parse this boilerplate object.
     *
     */
    canParse(object: any): boolean
    
    /**
     * Parses the boilerplate object
     *
     * @param {*} object
     * @returns {Boilerplate}
     */
    parse(object: any): Boilerplate
}