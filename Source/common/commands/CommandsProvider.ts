/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, ICanProvideDefaultCommands } from "@dolittle/tooling.common.commands";
import { Logger } from "@dolittle/tooling.common.logging";
import { DocumentationCommand } from "../index";


export class CommandsProvider implements ICanProvideDefaultCommands {

    private _commands: ICommand[] 

    constructor(logger: Logger) {
        this._commands = [
            new DocumentationCommand(logger)
        ];
    }
    provide() { return this._commands; }

}