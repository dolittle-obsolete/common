/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when there are multiple commands with the same name
 *
 * @export
 * @class DuplicateCommandName
 * @extends {Exception}
 */
export class DuplicateCommandName extends Exception {

    /**
     * Instantiates an instance of {DuplicateCommandName}.
     * @param {string} commandName
     */
    constructor(commandName: string) {
        super(`Found multiple commands with the name '${commandName}'`);
    }
}