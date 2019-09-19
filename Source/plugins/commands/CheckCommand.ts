/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { IFileSystem } from '@dolittle/tooling.common.files';
import { requireInternet, ILatestCompatiblePackageFinder, ICanDownloadPackages, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { askToDownloadOrUpdatePlugins, checkPlugins, IPluginDiscoverers, IPlugins } from '../internal'

const name = 'check';
const description = `Checks whether you have plugins that are out of date.

Lists installed plugins that are out of date with the latest version.

Asks whether to download the latest plugins or not.`;

const shortDescription = 'Checks whether you have plugins that are out of date';

/**
 * Represents an implementation of {ICommand} for checking versions of plugins
 *
 * @export
 * @class CheckCommand
 * @extends {Command}
 */
export class CheckCommand extends Command {

    /**
     * Instantiates an instance of {CheckCommand}.
     */
    constructor(private _plugins: IPlugins, private _pluginDiscoverers: IPluginDiscoverers, private _latestPackageFinder: ILatestCompatiblePackageFinder, 
                private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false, shortDescription);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info(`Executing 'plugins check' command`);
        await requireInternet(this._connectionChecker, busyIndicator);
        
        let outOfDatePackages = await checkPlugins(this._pluginDiscoverers, this._latestPackageFinder, this._fileSystem, this._connectionChecker, busyIndicator);
        await askToDownloadOrUpdatePlugins(outOfDatePackages, this._plugins, dependencyResolvers, this._packageDownloader, this._connectionChecker, busyIndicator);    
    }

}
