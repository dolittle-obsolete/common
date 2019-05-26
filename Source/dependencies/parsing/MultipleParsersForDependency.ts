/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets thrown when multiple dependency parsers are found for a dependency
 *
 * @export
 * @class MultipleParsersForDependency
 * @extends {Error}
 */
export class MultipleParsersForDependency extends Error {
    
    /**
     *Instantiates an instance of {MultipleParsersForDependency}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleParsersForDependency);
    }

    static get new() {
        return new MultipleParsersForDependency('Found multiple dependency parsers');
    } 
}