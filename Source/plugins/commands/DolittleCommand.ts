/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, ICommandManager } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { FileSystem } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import { requireInternet, isGreaterVersion } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { fetchDolittlePlugins, OnlineDolittlePluginsFinder, getInstalledPlugins, IPluginDiscoverers, askToDownloadOrUpdatePlugins, PluginPackageInfo, IPlugins } from '../index';

const name = 'dolittle';
const description = `Lists Dolittle's plugins found on npm`;

/**
 * Represents an implementation of {ICommand} for finding Dolittle plugins online 
 *
 * @export
 * @class DolittleCommand
 * @extends {Command}
 */
export class DolittleCommand extends Command {
    /**
     * Instantiates an instance of {DolittleCommand}.
     */
    constructor(private _plugins: IPlugins, private _pluginDiscoverers: IPluginDiscoverers, private _dependencyResolvers: IDependencyResolvers, private _onlinePluginFinder: OnlineDolittlePluginsFinder, 
                private _commandManager: ICommandManager, private _fileSystem: FileSystem, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        this._logger.info(`Executing 'plugins dolittle' command`);
        await requireInternet(busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop()

        let plugins = await fetchDolittlePlugins(this._onlinePluginFinder, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let localPlugins = await getInstalledPlugins(this._pluginDiscoverers, this._fileSystem, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let newAvailablePlugins = plugins.filter(plugin => !localPlugins.map(_ => _.name).includes(plugin.name));
        let upgradeablePlugins = plugins.filter(plugin => localPlugins.map(_ => _.name).includes(plugin.name))
            .map(plugin => {
                let localPlugin = localPlugins.find(_ => _.name === plugin.name);
                if (localPlugin) {
                    return {name: plugin.name, version: plugin.version, localVersion: localPlugin.version};
                }
                return undefined;
            })
            .filter(_ => _ && isGreaterVersion(_.version, _.localVersion));
        
        outputter.warn(`Found ${newAvailablePlugins.length} new plugins`);
        outputter.print(newAvailablePlugins.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        outputter.warn(`Found ${upgradeablePlugins.length} upgradeable plugin`);
        outputter.print(upgradeablePlugins.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
            
        let pluginsToDownload = newAvailablePlugins.concat(<any>upgradeablePlugins);
        await askToDownloadOrUpdatePlugins(pluginsToDownload as PluginPackageInfo[], this._plugins,
            this._dependencyResolvers, this._commandManager, busyIndicator);    
        if (busyIndicator.isBusy) busyIndicator.stop();
    }
    
}