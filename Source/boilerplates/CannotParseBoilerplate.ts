/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets thrown when there are multiple instances of {ICanParseBoilerplates} that can parse a given boilerplate
 *
 * @export
 * @class CannotParseBoilerplate
 * @extends {Error}
 */
export class CannotParseBoilerplate extends Error {
    /**
     * Instantiates an instance of {CannotParseBoilerplate}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CannotParseBoilerplate);
    }

    static get new() {
        return new CannotParseBoilerplate('Cannot parse boilerplate');
    } 
}
