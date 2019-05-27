/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate, ICanParseBoilerplates } from "./index";

/**
 * Defines a system that knows about boilerplate parsers {ICanParseBoilerplates}
 *
 * @export
 * @interface IBoilerplateParsers
 */
export interface IBoilerplateParsers {

    /**
     * The instances of {ICanParseBoilerplates}
     *
     * @type {ICanParseBoilerplates[]}
     */
    readonly parsers: ICanParseBoilerplates[]

    /**
     * Whether or not this boilerplate object can be parsed
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

    /**
     * Add boilerplate parsers
     *
     * @param {...ICanParseBoilerplates[]} parsers
     */
    add(...parsers: ICanParseBoilerplates[]): void
}