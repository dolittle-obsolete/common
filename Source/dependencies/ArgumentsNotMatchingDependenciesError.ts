/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets throw when the given arguments doesn't match up with the argument dependencies
 *
 * @export
 * @class ArgumentsNotMatchingDependenciesError
 * @extends {Error}
 */
export class ArgumentsNotMatchingDependenciesError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ArgumentsNotMatchingDependenciesError);
    }

    static get new() {
        return new ArgumentsNotMatchingDependenciesError('Given arguments not matching dependencies');
    } 
}