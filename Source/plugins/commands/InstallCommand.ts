/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers, PromptDependency, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { requireInternet, isGreaterVersion, ToolingPackage, ICanDownloadPackages, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { fetchOnlinePlugins, fetchDolittlePlugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, getInstalledPlugins, IPluginDiscoverers, askToDownloadOrUpdatePlugins, PluginPackageInfo, IPlugins } from '../internal';

const name = 'install';
const description = `Prompt to install plugins`;

const dolittlePluginsDependency = new PromptDependency(
    'dolittle',
    'Whether to only find plugins under the Dolittle scope / user',
    [],
    argumentUserInputType,
    'Find only plugins under Dolittle scope / user?',
    true
);

/**
 * Represents an implementation of {ICommand} for finding and installing boilerplates 
 *
 * @export
 * @class InstallCommand
 * @extends {Command}
 */
export class InstallCommand extends Command {

    /**
     * Instantiates an instance of {DolittleCommand}.
     */
    constructor(private _plugins: IPlugins, private _pluginDiscoverers: IPluginDiscoverers, private _onlinePluginsFinder: OnlinePluginsFinder, private _onlineDolittlePluginsFinder: OnlineDolittlePluginsFinder, 
                private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false, undefined, [dolittlePluginsDependency]);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info(`Executing 'plugins install' command`);
        await requireInternet(this._connectionChecker, busyIndicator);
        let plugins: ToolingPackage[] = [];
        let context = await dependencyResolvers.resolve({}, this.dependencies, [], commandContext.currentWorkingDirectory, commandContext.coreLanguage)
        if (context[dolittlePluginsDependency.name])
            plugins = await fetchDolittlePlugins(this._onlineDolittlePluginsFinder, this._connectionChecker, busyIndicator);
        else 
            plugins = await fetchOnlinePlugins(this._onlinePluginsFinder, this._connectionChecker,busyIndicator, commandContext.namespace? [commandContext.namespace]: []);

        let localPlugins = await getInstalledPlugins(this._pluginDiscoverers, busyIndicator);
        let newAvailablePlugins = plugins.filter(boilerplate => !localPlugins.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeablePlugins = plugins.filter(boilerplate => localPlugins.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(plugin => {
                let localPlugin = localPlugins.find(_ => _.packageJson.name === plugin.name);
                if (localPlugin) {
                    return {name: plugin.name, version: plugin.version, localVersion: localPlugin.packageJson.version};
                }
                return undefined;
            })
            .filter(_ => _ && isGreaterVersion(_.version, _.localVersion));
        
        outputter.warn(`Found ${newAvailablePlugins.length} new plugins`);
        outputter.print(newAvailablePlugins.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        outputter.warn(`Found ${upgradeablePlugins.length} upgradeable plugins`);
        outputter.print(upgradeablePlugins.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
            
        let pluginsToDownload = newAvailablePlugins.concat(<any>upgradeablePlugins);
        await askToDownloadOrUpdatePlugins(pluginsToDownload as PluginPackageInfo[], this._plugins, dependencyResolvers, this._packageDownloader, this._connectionChecker, busyIndicator);    
    }

}
