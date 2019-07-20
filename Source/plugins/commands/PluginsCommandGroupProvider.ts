/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideDefaultCommandGroups, ICommandGroup } from "@dolittle/tooling.common.commands";
import { FileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ILatestCompatiblePackageFinder } from "@dolittle/tooling.common.packages";
import { PluginsCommandGroup, IPluginDiscoverers, IPlugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, CheckCommand, InitCommand, InstalledCommand, ListCommand, InstallCommand } from "../index";

export class PluginsCommandGroupProvider implements ICanProvideDefaultCommandGroups {

    private _pluginsCommandGroup: PluginsCommandGroup
    

    constructor(pluginDiscoverers: IPluginDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder, plugins: IPlugins, 
                onlinePluginsFinder: OnlinePluginsFinder, onlineDolittlePluginsFinder: OnlineDolittlePluginsFinder, fileSystem: FileSystem, logger: ILoggers ) {
        this._pluginsCommandGroup = new PluginsCommandGroup([
            new CheckCommand(plugins, pluginDiscoverers, latestPackageFinder, fileSystem, logger),
            new InitCommand(plugins, logger),
            new InstallCommand(plugins, pluginDiscoverers, onlinePluginsFinder, onlineDolittlePluginsFinder, fileSystem, logger),
            new InstalledCommand(pluginDiscoverers, fileSystem, logger),
            new ListCommand(plugins, logger),
        ]);
    }
    provide(): ICommandGroup[] { return [this._pluginsCommandGroup]; }

}