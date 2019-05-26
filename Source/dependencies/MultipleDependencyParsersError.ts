/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets thrown when multiple dependency parsers are found for a dependency
 *
 * @export
 * @class MultipleDependencyParsersError
 * @extends {Error}
 */
export class MultipleDependencyParsersError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleDependencyParsersError);
    }

    static get new() {
        return new MultipleDependencyParsersError('Found multiple dependency parsers');
    } 
}