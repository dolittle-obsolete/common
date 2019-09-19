/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, NullMessageOutputter, NullBusyIndicator, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICommandExecutor, ICommand, CommandContext, NullFailedCommandOutputter } from "../internal";

/**
 * Represents an implementation of {ICommandExecutor}
 */
export class CommandExecutor implements ICommandExecutor {
    
    /**
     * Instantiates an instance of {CommandExecutor}.
     * @param {ILoggers} _logger
     */
    constructor(private _logger: ILoggers) {}
    
    failedCommandOutputter = new NullFailedCommandOutputter();

    async execute(command: ICommand, commandContext: CommandContext, dependencyResolvers: IDependencyResolvers,
        outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing command with arguments ${command.name}`);
        await command.action(commandContext, dependencyResolvers, this.failedCommandOutputter, outputter, busyIndicator);
        this._logger.info('Finished executing command');
    }
}
