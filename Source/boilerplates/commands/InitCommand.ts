/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { initBoilerplatesSystem, IBoilerplateDiscoverers, IBoilerplatesLoader } from '../internal';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

const name = 'init';
const description = 'Initializes the boilerplates system';

/**
 * Represents an implementation of {ICommand} for initializing the boilerplates system
 *
 * @export
 * @class InitCommand
 * @extends {Command}
 */
export class InitCommand extends Command {

    /**
     * Instantiates an instance of {InitCommand}.
     */
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _boilerplateLoader: IBoilerplatesLoader, private _logger: ILoggers) {
        super(name, description, false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info("Executing 'boilerplates init' command");
        await initBoilerplatesSystem(this._boilerplateDiscoverers, this._boilerplateLoader, busyIndicator);
    }

}
