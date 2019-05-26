/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets thrown when no connection to the internet could be established
 *
 * @export
 * @class NotConnectedToInternet
 * @extends {Error}
 */
export class NotConnectedToInternet extends Error {
    /**
     * Instantiates an instance of {NotConnectedToInternet}.
     * @param {...any} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, NotConnectedToInternet);
    }

    static get new() {
        return new NotConnectedToInternet('Could not establish internet connection');
    } 
}
