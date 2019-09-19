/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICommand, CommandContext, IFailedCommandOutputter } from "../internal";

/**
 * Defines a system that can execute a command
 */
export interface ICommandExecutor {
    
    /**
     * The {IFailedCommandOutputter}
     *
     * @type {IFailedCommandOutputter}
     */
    failedCommandOutputter: IFailedCommandOutputter
    
    /**
     * Executes a command
     *
     * @param {ICommand} command  
     * @param {CommandContext} commandContext  
     * @param {IDependencyResolvers} dependencyResolvers  
     * @param {Map<string, string>} [commandOptions] The optional arguments/options for the command
     * @param {ICanOutputMessages} [outputter] The system that can output messages
     * @param {IBusyIndicator} [busyIndicator]
     */
    execute(command: ICommand, commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, outputter?: ICanOutputMessages, busyIndicator?: IBusyIndicator): Promise<void>

}
