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
     */
    canParse(obj: any): boolean;

    /**
     * Resolves dependencies and returns the context object
     *
     */
    parse(obj: any, name: string): IDependency

}