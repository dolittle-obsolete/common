/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from "@dolittle/tooling.common.logging";
import { 
    ICommandManager, INamespaces, ICommands, ICommandGroups, ICanProvideCommands, 
    ICanProvideCommandGroups, ICanProvideNamespaces, INamespace
} from "../internal";

/**
 * Represents an implementation of {ICommandManager}
 */
export class CommandManager implements ICommandManager {
    
    /**
     * Instantiates an instance of {CommandManager}.
     * @param {INamespaces} _namespaces
     * @param {ICommandGroups} _commandGroups
     * @param {ICommands} _commands
     * @param {ILoggers} _logger
     */
    constructor(private _namespaces: INamespaces, private _commandGroups: ICommandGroups, private _commands: ICommands, private _logger: ILoggers) {}
    
    get namespaces() { 
        let namespaces = this._namespaces.namespaces;
        this.addBoilerplateCommandsToNamespaces(namespaces);
        return namespaces;
    }
    
    get commands() { 
        return this._commands.commands;
    }

    get commandGroups() { 
        return this._commandGroups.commandGroups;
    }

    clear() {
        this._logger.info('Clearing command manager');
        this._commands.clear();
        this._commandGroups.clear();
        this._namespaces.clear();
    }

    async registerProviders(commandProviders: ICanProvideCommands[], commandGroupsProviders: ICanProvideCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._logger.info('Registering providers');
        await Promise.all([
            this._commands.register(...commandProviders),
            this._commandGroups.register(...commandGroupsProviders),
            this._namespaces.register(...namespaceProviders)
        ]);
        this._logger.info('Finished registering providers');
    }

    async registerDefaultProviders(commandProviders: ICanProvideCommands[], commandGroupsProviders: ICanProvideCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._logger.info('Registering default providers');
        await Promise.all([
            this._commands.registerDefault(...commandProviders),
            this._commandGroups.registerDefault(...commandGroupsProviders),
            this._namespaces.registerDefault(...namespaceProviders)
        ]);
        this._logger.info('Finished registering default providers');
    }

    private addBoilerplateCommandsToNamespaces(namespaces: INamespace[]) {
        namespaces.filter(_ => _.hasBoilerplates).forEach(_ => {
            _.addDefaultCommands(this._commands.commands.filter(_ => _.isBoilerplatesCommand));
            _.addDefaultCommandGroups(this._commandGroups.commandGroups.filter(_ => _.isBoilerplatesCommandGroup));
        });
    }
}
