/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, ICanProvideCommands } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { DocumentationCommand, ReloadPluginsCommand, IInitializer } from '../internal';

/**
 * Represents an implementation of {ICanProvideDefaultCommands}
 *
 * @export
 * @class CommandsProvider
 * @implements {ICanProvideDefaultCommands}
 */
export class CommandsProvider implements ICanProvideCommands {

    private _commands: ICommand[];

    /**
     * Instantiates an instance of {CommandsProvider}.
     * @param {ILoggers} logger
     */
    constructor(initializer: IInitializer, loggers: ILoggers) {
        this._commands = [
            new DocumentationCommand(loggers),
            new ReloadPluginsCommand(initializer, loggers)
        ];
    }
    provide() {
        return this._commands;
    }

}
