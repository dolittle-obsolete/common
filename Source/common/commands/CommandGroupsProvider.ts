/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand,  ICanProvideCommandGroups, ICommandGroup } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { IInitializer, ContextsCommandGroup, CurrentContextCommand, ListContextsCommand } from "../internal";
import { IContexts } from "@dolittle/tooling.common.login";

/**
 * Represents an implementation of {ICanProvideDefaultCommands}
 *
 * @export
 * @class CommandsProvider
 * @implements {ICanProvideDefaultCommands}
 */
export class CommandGroupsProvider implements ICanProvideCommandGroups {

    private _commandGroups: ICommandGroup[];

    /**
     * Instantiates an instance of {CommandsProvider}.
     * @param {ILoggers} logger
     */
    constructor(contexts: IContexts) {
        this._commandGroups = [
            new ContextsCommandGroup([
                new CurrentContextCommand(contexts),
                new ListContextsCommand(contexts)
            ])

        ];
    }

    provide() { 
        return this._commandGroups;
    }

}
