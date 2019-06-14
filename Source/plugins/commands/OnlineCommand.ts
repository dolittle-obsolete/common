/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {Command, ICommandManager} from '@dolittle/tooling.common.commands';
import { FileSystem } from '@dolittle/tooling.common.files';
import { requireInternet, isGreaterVersion } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependencyResolvers, PromptDependency, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { Logger } from '@dolittle/tooling.common.logging';
import { fetchOnlinePlugins, OnlinePluginsFinder, getInstalledPlugins, IPluginDiscoverers, askToDownloadOrUpdatePlugins, PluginPackageInfo, IPlugins } from '../index';

const name = 'online';
const description = 'Finds plugins on npmjs';

const keywordDependency = new PromptDependency(
    'keywords', 
    'The additional list of keywords to use in the search',
    argumentUserInputType,
    'Additional keywords:',
    true
);
const limitDependency = new PromptDependency(
    'limit', 
    'The limit of boilerplates',
    argumentUserInputType,
    'Limit: ',
    true
);
const dependencies = [
    keywordDependency,
    limitDependency
]

/**
 * Represents an implementation of {ICommand} for finding online plugins
 *
 * @export
 * @class OnlineCommand
 * @extends {Command}
 */
export class OnlineCommand extends Command {

    /**
     * Instantiates an instance of {OnlineCommand}.
     * @memberof Online
     */
    constructor(private _plugins: IPlugins, private _pluginsFinder: OnlinePluginsFinder, private _pluginDiscoverers: IPluginDiscoverers, private _dependencyResolvers: IDependencyResolvers,
                private _commandManager: ICommandManager, private _fileSystem: FileSystem, private _logger: Logger) {
        super(name, description, undefined, dependencies);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'plugins online' command`);
        await requireInternet(busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let context = await this._dependencyResolvers.resolve({}, dependencies, cwd, coreLanguage, commandArguments, commandOptions);
        let keywords = context[keywordDependency.name];
        let limit = parseInt(context[limitDependency.name]);

        let plugins = await fetchOnlinePlugins(this._pluginsFinder, busyIndicator, keywords, limit);
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
                return undefined
            })
            .filter(_ => _ && isGreaterVersion(_.localVersion, _.version));

        
        outputter.warn(`Found ${newAvailablePlugins.length} new plugins`);
        outputter.print(newAvailablePlugins.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        outputter.warn(`Found ${upgradeablePlugins.length} upgradeable plugins`);
        outputter.print(upgradeablePlugins.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
        
        let boilerplatesToDownload = newAvailablePlugins.concat(<any>upgradeablePlugins);
        await askToDownloadOrUpdatePlugins(boilerplatesToDownload as PluginPackageInfo[], this._plugins, this._dependencyResolvers, this._commandManager, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
          
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}
