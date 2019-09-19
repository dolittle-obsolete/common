/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICommandManager, ICanProvideCommandGroups } from "@dolittle/tooling.common.commands";
import { ILatestCompatiblePackageFinder, ICanDownloadPackages, IConnectionChecker } from "@dolittle/tooling.common.packages";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { PluginsCommandGroupProvider, IPluginDiscoverers, IPlugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, IPluginLoader } from "../internal";

/**
 * Represents an implementation of {ICanRegisterProviders}
 *
 * @export
 * @class ProviderRegistrator
 * @implements {ICanRegisterProviders}
 */
export class ProviderRegistrator implements ICanRegisterProviders {
    
    private _commandGroupProviders: ICanProvideCommandGroups[] = [];
    
    /**
     * Instantiates an instance of {ProviderRegistrator}.
     * @param {ICommandManager} _commandManager
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
    constructor(private _commandManager: ICommandManager, pluginDiscoverers: IPluginDiscoverers, pluginLoader: IPluginLoader, latestPackageFinder: ILatestCompatiblePackageFinder, 
        plugins: IPlugins, onlinePluginsFinder: OnlinePluginsFinder, onlineDolittlePluginsFinder: OnlineDolittlePluginsFinder, 
        packageDownloader: ICanDownloadPackages, connectionChecker: IConnectionChecker, fileSystem: IFileSystem, logger: ILoggers) {
        this._commandGroupProviders.push(new PluginsCommandGroupProvider(
            pluginDiscoverers,
            pluginLoader,
            latestPackageFinder, 
            plugins, 
            onlinePluginsFinder, 
            onlineDolittlePluginsFinder,
            packageDownloader,
            connectionChecker,
            fileSystem, 
            logger
        ));
    }

    register() {
        return this._commandManager.registerDefaultProviders([], this._commandGroupProviders, [])
    }

}
