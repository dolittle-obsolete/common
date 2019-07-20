/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICommandManager, ICanProvideDefaultCommandGroups } from "@dolittle/tooling.common.commands";
import { ILatestCompatiblePackageFinder } from "@dolittle/tooling.common.packages";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { PluginsCommandGroupProvider, IPluginDiscoverers, IPlugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder } from "../index";


/**
 * Represents an implementation of {ICanRegisterProviders}
 *
 * @export
 * @class ProviderRegistrator
 * @implements {ICanRegisterProviders}
 */
export class ProviderRegistrator implements ICanRegisterProviders {
    
    private _commandGroupProviders: ICanProvideDefaultCommandGroups[] = [];

    constructor(private _commandManager: ICommandManager, pluginDiscoverers: IPluginDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder, 
        plugins: IPlugins, onlinePluginsFinder: OnlinePluginsFinder, onlineDolittlePluginsFinder: OnlineDolittlePluginsFinder, 
        fileSystem: IFileSystem, logger: ILoggers) {
        this._commandGroupProviders.push(new PluginsCommandGroupProvider(
            pluginDiscoverers, latestPackageFinder, plugins, onlinePluginsFinder, onlineDolittlePluginsFinder, fileSystem, logger
        ));
    }

    register() {
        this._commandManager.registerDefaultProviders([], this._commandGroupProviders, [])
    }

}