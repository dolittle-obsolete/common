/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets thrown when a the invocation of an operation is missing the core language parameter
 *
 * @export
 * @class MissingCoreLanguage
 * @extends {Error}
 */
export class MissingCoreLanguage extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingCoreLanguage);
    }

    static get new() {
        return new MissingCoreLanguage('Missing core language');
    } 
}