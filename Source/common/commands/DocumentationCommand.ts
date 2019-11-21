/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, IFailedCommandOutputter, CommandContext } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import open from 'open';

const name = 'documentation';
const description = 'Opens up the dolittle documentation site in default browser';

/**
 * Represents an implementation of {ICommand} for opening up dolittle documentation
 *
 * @export
 * @class InitCommand
 * @extends {Command}
 */
export class DocumentationCommand extends Command {

    /**
     * Instantiates an instance of {DocumentationCommand}.
     */
    constructor(private _logger: ILoggers) {
        super(name, description, false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info(`Executing 'documentation' command`);
        await open('https://www.dolittle.io');
        
    }

}
