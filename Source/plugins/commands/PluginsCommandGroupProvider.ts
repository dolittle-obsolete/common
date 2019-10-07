/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideCommandGroups, ICommandGroup } from "@dolittle/tooling.common.commands";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ILatestCompatiblePackageFinder, IConnectionChecker, ICanDownloadPackages } from "@dolittle/tooling.common.packages";
import { PluginsCommandGroup, IPluginDiscoverers, IPlugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, CheckCommand, InitCommand, InstalledCommand, ListCommand, InstallCommand, IPluginLoader } from "../internal";

/**
 * Represents an implementation of {ICanProvideCommandGroups}
 *
 * @export
 * @class PluginsCommandGroupProvider
 * @implements {ICanProvideCommandGroups}
 */
export class PluginsCommandGroupProvider implements ICanProvideCommandGroups {

    private _pluginsCommandGroup: PluginsCommandGroup
    
    /**
     * Instantiates an instance of {PluginsCommandGroupProvider}.
     * @param {IPluginDiscoverers} pluginDiscoverers
     * @param {ILatestCompatiblePackageFinder} latestPackageFinder
     * @param {IPlugins} plugins
     * @param {OnlinePluginsFinder} onlinePluginsFinder
     * @param {OnlineDolittlePluginsFinder} onlineDolittlePluginsFinder
     * @param {ICanDownloadPackages} packageDownloader
     * @param {IConnectionChecker} connectionChecker
     * @param {IFileSystem} fileSystem
     * @param {ILoggers} logger
     */
    constructor(pluginDiscoverers: IPluginDiscoverers, pluginLoader: IPluginLoader, latestPackageFinder: ILatestCompatiblePackageFinder, plugins: IPlugins, 
                onlinePluginsFinder: OnlinePluginsFinder, onlineDolittlePluginsFinder: OnlineDolittlePluginsFinder, 
                packageDownloader: ICanDownloadPackages, connectionChecker: IConnectionChecker, fileSystem: IFileSystem, logger: ILoggers ) {
        this._pluginsCommandGroup = new PluginsCommandGroup([
            new CheckCommand(plugins, pluginDiscoverers, latestPackageFinder, packageDownloader, connectionChecker, fileSystem, logger),
            new InitCommand(plugins, logger),
            new InstallCommand(plugins, pluginDiscoverers, onlinePluginsFinder, onlineDolittlePluginsFinder, packageDownloader, connectionChecker, fileSystem, logger),
            new InstalledCommand(pluginDiscoverers, fileSystem, logger),
            new ListCommand(pluginLoader, logger),
        ]);
    }
    provide(): ICommandGroup[] { return [this._pluginsCommandGroup]; }

}
