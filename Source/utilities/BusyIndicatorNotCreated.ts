/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from './internal';

/**
 * The exception that is thrown when an action is attempt performed on an {IBusyIndicator} that has not been created.
 *
 * @export
 * @class BusyIndicatorNotCreated
 * @extends {Exception}
 */
export class BusyIndicatorNotCreated extends Exception {

    /**
     * Instantiates an instance of {BusyIndicatorNotCreated}.
     * @param {string} [message]
     */
    constructor(message?: string) {
        super(message);
    }
}
