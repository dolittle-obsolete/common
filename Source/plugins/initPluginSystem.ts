/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { ICommandManager, ICanProvideDefaultCommands, ICanProvideDefaultCommandGroups, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';
import { IPlugins } from './index';

/**
 * Initializes the boilerplates system in the common tooling
 * 
 * @param {IPlugins} plugins
 * @param {IBusyIndicator} busyIndicator
 */
export async function initPluginSystem(plugins: IPlugins, busyIndicator: IBusyIndicator, commandManager: ICommandManager) {
    busyIndicator = busyIndicator.createNew().start('Initializing plugin system');
    try {
        plugins.discoverNewPlugins();
        let loadedPlugins = await plugins.getPlugins();

        commandManager.clear();
        let providers: {command: ICanProvideDefaultCommands[], commandGroup: ICanProvideDefaultCommandGroups[], namespace: ICanProvideNamespaces[]} = {command: [], commandGroup: [], namespace: []};

        loadedPlugins.forEach(_ => {
            providers.command.push(_.defaultCommandsProvider);
            providers.commandGroup.push(_.defaultCommandGroupsProvider);
            providers.namespace.push(_.namespaceProvider);
        });

        commandManager.registerProviders(providers.command, providers.commandGroup, providers.namespace);
        
        busyIndicator.succeed('Plugin system initialized');
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}