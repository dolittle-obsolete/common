/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets thrown when a the invocation of an operation is missing the core language parameter
 *
 * @export
 * @class MissingDestinationPath
 * @extends {Error}
 */
export class MissingDestinationPath extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingDestinationPath);
    }

    static get new() {
        return new MissingDestinationPath('Missing destination path');
    } 
}