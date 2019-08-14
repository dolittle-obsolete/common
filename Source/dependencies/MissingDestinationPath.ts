/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Exception} from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets thrown when a the invocation of an operation is missing the core language parameter
 *
 * @export
 * @class MissingDestinationPath
 * @extends {Exception}
 */
export class MissingDestinationPath extends Exception {

    /**
     * Instantiates an instance of {MissingDestinationPath}.
     * @param {string} message 
     */
    constructor(message?: string) {
        super(message? message : 'Missing destination path');
    }
}
