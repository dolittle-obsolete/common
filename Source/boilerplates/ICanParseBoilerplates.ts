/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate } from "./index";

/**
 * Defines a system that can parse boilerplates
 *
 * @export
 * @interface ICanParseBoilerplates
 */
export interface ICanParseBoilerplates {

    /**
     * Whether or not this boilerplate parser can parse this boilerplate object.
     *
     * @param {*} boilerplate
     * @returns {boolean}
     */
    canParse(boilerplate: any): boolean
    
    /**
     * Parses the boilerplate object
     *
     * @param {*} boilerplate
     * @param {string} boilerplatePath
     * @returns {Boilerplate}
     */
    parse(boilerplate: any, boilerplatePath: string): Boilerplate
}