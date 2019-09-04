/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency } from "@dolittle/tooling.common.dependencies";
import { ICommand, CommandContext } from "../index";

/**
 * Defines a system that can output a failed command
 */
export interface IFailedCommandOutputter {

     /**
     * Outputs a message when a command is failed
     *
     * @param {ICommand} command  
     * @param {CommandContext} commandContext
     * @param {IDependency[]} dependencies
     */
    output(command: ICommand, commandContext: CommandContext, dependencies: IDependency[]): void

}
