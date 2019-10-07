/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The base class for an exception
 *
 * @export
 * @class Exception
 * @extends {Error}
 */
export class Exception extends Error {
    
    /**
     * Instantiates an instance of {Exception}.
     * @param {string} [message]
     */
    constructor(message?: string) {
        super(message? message : '');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

