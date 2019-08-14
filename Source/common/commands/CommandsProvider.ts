/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, ICanProvideDefaultCommands } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { DocumentationCommand } from "../index";

/**
 * Represents an implementation of {ICanProvideDefaultCommands}
 *
 * @export
 * @class CommandsProvider
 * @implements {ICanProvideDefaultCommands}
 */
export class CommandsProvider implements ICanProvideDefaultCommands {

    private _commands: ICommand[];

    /**
     * Instantiates an instance of {CommandsProvider}.
     * @param {ILoggers} logger
     */
    constructor(logger: ILoggers) {
        this._commands = [
            new DocumentationCommand(logger)
        ];
    }
    provide() { 
        return this._commands;
    }

}
