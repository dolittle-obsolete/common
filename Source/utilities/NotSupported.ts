/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from './internal';

/**
 * The exception that is thrown when an action is not supported.
 *
 * @export
 * @class NotSupported
 * @extends {Exception}
 */
export class NotSupported extends Exception {

    /**
     * Instantiates an instance of {NotSupported}.
     * @param {string} [message]
     */
    constructor(message?: string) {
        super(message);
    }
}
