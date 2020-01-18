/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideCommandGroups, ICommandGroup } from '@dolittle/tooling.common.commands';
import { IContexts } from '@dolittle/tooling.common.login';
import { ContextsCommandGroup, CurrentContextCommand, ListContextsCommand, RenameContextCommand, RenameCurrentContextCommand, UseContextCommand, RemoveContextCommand } from '../internal';

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
                new ListContextsCommand(contexts),
                new RenameContextCommand(contexts),
                new RenameCurrentContextCommand(contexts),
                new UseContextCommand(contexts),
                new RemoveContextCommand(contexts)
            ])

        ];
    }

    provide() {
        return this._commandGroups;
    }

}
