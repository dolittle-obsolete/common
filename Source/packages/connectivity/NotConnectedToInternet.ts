/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets thrown when no connection to the internet could be established
 *
 * @export
 * @class NotConnectedToInternet
 * @extends {Exception}
 */
export class NotConnectedToInternet extends Exception {
    /**
     * Instantiates an instance of {NotConnectedToInternet}.
     * @param {string} [message]
     */
    constructor(message?: string) {
        super(message ? message : 'Could not establish an internet connection');
    }
}
