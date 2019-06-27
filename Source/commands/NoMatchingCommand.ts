/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when there are no matching commands
 *
 * @export
 * @class NoMatchingCommand
 * @extends {Exception}
 */
export class NoMatchingCommand extends Exception {

    /**
     * Instantiates an instance of {NoMatchingCommand}.
     * @param {string} argument
     * @param {string} [namespace]
     * @param {string} [commandGroup]
     */
    constructor(argument: string, namespace?: string, commandGroup?: string) {
        let text = `Could not find command '${argument}'`;
        if (namespace) text += ` under namespace '${namespace}'`;
        if (commandGroup) text += ` in command group '${commandGroup}'`;
        super(text);
    }
}