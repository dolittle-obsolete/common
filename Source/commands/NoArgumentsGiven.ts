/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when there are no arguments given to the command manager execute 
 *
 * @export
 * @class NoArgumentsGiven
 * @extends {Exception}
 */
export class NoArgumentsGiven extends Exception {

    /**
     * Instantiates an instance of {NoArgumentsGiven}.
     */
    constructor() {
        super('No arguments were given to the command manager for executing a command');
    }
}
