/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { IDependencyResolvers, IDependency } from "@dolittle/tooling.common.dependencies";
import { IInitializer } from "../index";

const name = 'reload-plugins';
const description = 'Reloads the plugins';

/**
 * Represents an implementation of {ICommand} for reloading plugins
 *
 * @export
 * @class ReloadPluginsCommand
 * @extends {Command}
 */
export class ReloadPluginsCommand extends Command {

    /**
     * Instantiates an instance of {ReloadPluginsCommand}.
     */
    constructor(private _initializer: IInitializer, private _logger: ILoggers) {
        super(name, description, false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info(`Executing 'reload-plugins' command`);
        await this._initializer.reloadPlugins(busyIndicator);
    }

}
