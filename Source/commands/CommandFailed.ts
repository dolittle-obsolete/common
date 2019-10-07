/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";
import { ICommand } from "./internal";

/**
 * The exception that gets thrown when a command throws an exception in its onAction procedure
 *
 * @export
 * @class CommandFailed
 * @extends {Exception}
 */
export class CommandFailed extends Exception {

    /**
     * Instantiates an instance of {CommandFailed}.
     * @param {ICommand} command
     * @param {Error} error
     */
    constructor(command: ICommand, error: Error) {
        super(`Command '${command.name}' failed to execute.\nError: ${error}`);
    }
}