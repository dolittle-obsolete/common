/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The exception that gets thrown when there are multiple parsers found for a boilerplate
 *
 * @export
 * @class MultipleParsersForBoilerplate
 * @extends {Error}
 */
export class MultipleParsersForBoilerplate extends Error {
    /**
     * Instantiates an instance of {MultipleParsersForBoilerplate}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleParsersForBoilerplate);
    }

    static get new() {
        return new MultipleParsersForBoilerplate('Found multiple parsers for boilerplate');
    } 
}
