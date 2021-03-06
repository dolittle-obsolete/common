/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { getPluginsInUse, IPluginLoader } from '../internal';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

const name = 'list';
const description = 'Lists the plugins in use by the tooling';

/**
 * Represents an implementation of {ICommand} for listing plugins in use by the tooling
 *
 * @export
 * @class ListCommand
 * @extends {Command}
 */
export class ListCommand extends Command {

    /**
     * Instantiates an instance of {ListCommand}
     */
    constructor(private _pluginLoader: IPluginLoader, private _logger: ILoggers) {
        super(name, description, false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {

        this._logger.info("Executing 'plugins list' command");
        const pluginsInUse = await getPluginsInUse(this._pluginLoader, busyIndicator)
            .catch((error: Error) => {
                outputter.warn('An error occured while getting the used plugins.\nError message:');
                outputter.error(error.message);
                outputter.warn('There problem might be that you haven\'t initialized the tooling');
                return [];
        });

        pluginsInUse.forEach(_ => outputter.print(`${_.packageJson.name} - ${_.packageJson.description}`));
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}
