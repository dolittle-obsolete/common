/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets throw when there aren't any dependency resolvers that can resolve a dependency
 *
 * @export
 * @class CannotResolveDependency
 * @extends {Error}
 */
export class CannotResolveDependency extends Error {
    /**
     * Instantiates an instance of {CannotResolveDependency}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CannotResolveDependency);
    }

    static get new() {
        return new CannotResolveDependency('Cannot resolve given dependency');
    } 
}