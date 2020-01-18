/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency, ICanParseDependencies } from '../internal';

/**
 * Defines a system for parsing an object into a Dependency
 *
 * @export
 * @interface IDependencyParser
 */
export interface IDependencyParsers {

    /**
     * All the instances of {ICanParseDependencies} that this system uses for parsing a dependency
     *
     * @type {ICanParseDependencies[]}
     * @readonly
     */
    readonly parsers: ICanParseDependencies[]

    /**
     * Parses a single dependency object by invoking an instance of {ICanParseDependencies} which can parse the given dependency
     *
     * Throws an exception if multiple parsers can parse the given dependency
     * @param {*} obj The dependency json object
     * @param {string} name The name of the dependency
     * @returns {IDependency}
     */
    parse(obj: any, name: string): IDependency

    /**
     * Add instances of {ICanParseDependencies} parsers to the dependency parsing system
     *
     * @param {...ICanParseDependencies[]} parser
     */
    add(...parser: ICanParseDependencies[]): void
}
