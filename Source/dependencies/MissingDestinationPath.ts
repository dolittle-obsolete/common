/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets thrown when a the invocation of an operation is missing the core language parameter
 *
 * @export
 * @class MissingDestinationPath
 * @extends {Error}
 */
export class MissingDestinationPath extends Error {

    /**
     * Instantiates an instance of {MissingDestinationPath}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingDestinationPath);
    }

    static get new() {
        return new MissingDestinationPath('Missing destination path');
    } 
}