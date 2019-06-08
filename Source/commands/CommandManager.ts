
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { Logger } from "@dolittle/tooling.common.logging";
import { INamespaces, IDefaultCommands, IDefaultCommandGroups, ICanProvideDefaultCommands, ICanProvideDefaultCommandGroups, ICanProvideNamespaces, ICommandManager, Namespaces, DefaultCommandGroups, DefaultCommands } from "./index";

/**
 * Represents an implementation of {ICommandManager}
 */
export class CommandManager implements ICommandManager {
    private _namespaces: INamespaces;
    private _defaultCommandGroups: IDefaultCommandGroups;
    private _defaultCommands: IDefaultCommands;

    constructor(private _logger: Logger) {
        this._namespaces = new Namespaces(this._logger);
        this._defaultCommandGroups = new DefaultCommandGroups(this._logger);
        this._defaultCommands = new DefaultCommands(this._logger);
    }
    
    get namespaces() { return this._namespaces.namespaces; }
    
    get commands() { return this._defaultCommands.commands; }

    get commandGroups() { return this._defaultCommandGroups.commandGroups; }

    
    async execute(currentWorkingDirectory: string, coreLanguage: string, commandOrGroupName: string, outputter: ICanOutputMessages, commandArguments?: string[], namespace?: string) {
        console.log('Execute command');
    }

    clear() {
        this._defaultCommands.clear();
        this._defaultCommandGroups.clear();
        this._namespaces.clear();
    }

    registerProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._defaultCommands.register(...defaultCommandProviders);
        this._defaultCommandGroups.register(...defaultCommandGroupsProviders);
        this._namespaces.register(...namespaceProviders);
    }
    registerDefaultProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._defaultCommands.registerDefault(...defaultCommandProviders);
        this._defaultCommandGroups.registerDefault(...defaultCommandGroupsProviders);
        this._namespaces.registerDefault(...namespaceProviders);
    }
}