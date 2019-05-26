/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets throw when there aren't any dependency parsers that can parse a dependency
 *
 * @export
 * @class CannotParseDependencyError
 * @extends {Error}
 */
export class CannotParseDependencyError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CannotParseDependencyError);
    }

    static get new() {
        return new CannotParseDependencyError('Cannot parse given dependency');
    } 
}