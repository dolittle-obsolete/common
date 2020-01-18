/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICanProvideCommands, ICommandManager, ICanProvideCommandGroups } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { CommandsProvider, IInitializer, CommandGroupsProvider } from '../internal';
import { IContexts } from '@dolittle/tooling.common.login';

/**
 * Represents an implementation of {ICanRegisterProviders}
 *
 * @export
 * @class ProviderRegistrator
 * @implements {ICanRegisterProviders}
 */
export class ProviderRegistrator implements ICanRegisterProviders {

    private _commandsProvider: ICanProvideCommands[] = [];
    private _commandGroupsProvider: ICanProvideCommandGroups[] = [];

    /**
     * Instantiates an instance of {ProviderRegistrator}.
     * @param {ICommandManager} _commandManager
     * @param {ILoggers} logger
     */
    constructor(private _commandManager: ICommandManager, initializer: IInitializer, contexts: IContexts, logger: ILoggers) {
        this._commandsProvider.push(new CommandsProvider(initializer, logger));
        this._commandGroupsProvider.push(new CommandGroupsProvider(contexts));
    }

    register() {
        return this._commandManager.registerDefaultProviders(this._commandsProvider, this._commandGroupsProvider, []);
    }

}
