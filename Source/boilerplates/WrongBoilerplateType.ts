/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The exception that gets thrown when the an unexpected {Boilerplate} type was received 
 *
 * @export
 * @class WrongBoilerplateType
 * @extends {Error}
 */
export class WrongBoilerplateType extends Error {
    /**
     * Instantiates an instance of {WrongBoilerplateType}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, WrongBoilerplateType);
    }
}
