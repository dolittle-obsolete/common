/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets throw when the given arguments doesn't match up with the argument dependencies
 *
 * @export
 * @class ArgumentsNotMatchingDependencies
 * @extends {Error}
 */
export class ArgumentsNotMatchingDependencies extends Error {

    /**
     * Instantiates an instance of {ArgumentsNotMatchingDependencies}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ArgumentsNotMatchingDependencies);
    }

    static get new() {
        return new ArgumentsNotMatchingDependencies('Given arguments not matching dependencies');
    } 
}