/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from './internal';

/**
 * Represents a system that can parse dependency objects
 *
 * @export
 * @interface ICanParseDependencies
 */
export interface ICanParseDependencies {
    /**
     * Whether this parser can parse the given dependency object
     *
     * @param {*} obj The dependency json object
     * @returns {boolean}
     * @memberof ICanParseDependencies
     */
    canParse(obj: any): boolean;

    /**
     * Parses a single dependency object
     *
     * @param {*} obj The dependency json object
     * @param {string} name The name of the dependency
     * @returns {IDependency} An instance of a Dependency sub-type
     * @memberof ICanParseDependencies
     */
    parse(obj: any, name: string): IDependency

}