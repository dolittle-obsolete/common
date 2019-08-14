/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from "@dolittle/tooling.common.commands";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { getInstalledPlugins, IPluginDiscoverers } from "../index";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";

const name = 'installed';
const description = 'Lists installed plugins';

/**
 * Represents an implementation of {ICommand} for listing the installed plugins
 *
 * @export
 * @class InstalledCommand
 * @extends {Command}
 */
export class InstalledCommand extends Command {
    
    /**
     * Instantiates an instance of {InstalledCommand}.
     */
    constructor(private _pluginDiscoverers: IPluginDiscoverers, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false);
    }

    async action(dependencyResolvers: IDependencyResolvers, cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'plugins installed' command`);
        let plugins = await getInstalledPlugins(this._pluginDiscoverers, busyIndicator)
            .catch((error: Error) => {
                if (busyIndicator.isBusy) busyIndicator.stop();
                outputter.warn('An error occured while getting the installed plugins.\nError message:');
                outputter.error(error.message);
                outputter.warn('The problem might be that you haven\'t initialized the tooling');
                return [];
            });
        plugins.forEach(_ => outputter.print(`${_.packageJson.name}@${_.packageJson.version}`));
    }
    
    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}
