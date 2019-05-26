/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets throw when there aren't any dependency parsers that can parse a dependency
 *
 * @export
 * @class CannotParseDependency
 * @extends {Error}
 */
export class CannotParseDependency extends Error {

    /**
     * Instantiates an instance of {CannotParseDependency}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CannotParseDependency);
    }

    static get new() {
        return new CannotParseDependency('Cannot parse given dependency');
    } 
}