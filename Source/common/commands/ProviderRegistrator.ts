/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICanProvideCommands, ICommandManager } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { CommandsProvider, IInitializer } from "../internal";

/**
 * Represents an implementation of {ICanRegisterProviders}
 *
 * @export
 * @class ProviderRegistrator
 * @implements {ICanRegisterProviders}
 */
export class ProviderRegistrator implements ICanRegisterProviders {
    
    private _commandsProvider: ICanProvideCommands[] = [];

    /**
     * Instantiates an instance of {ProviderRegistrator}.
     * @param {ICommandManager} _commandManager
     * @param {ILoggers} logger
     */
    constructor(private _commandManager: ICommandManager, initializer: IInitializer, logger: ILoggers) {
        this._commandsProvider.push(new CommandsProvider(initializer, logger));
    }

    register() {
        return this._commandManager.registerDefaultProviders(this._commandsProvider, [], [])
    }

}
