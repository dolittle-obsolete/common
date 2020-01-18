/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, CommandContext } from '../internal';
import { IDependency } from '@dolittle/tooling.common.dependencies';

/**
 * Defines a system that can output a failed command
 */
export interface IFailedCommandOutputter {

    /**
     * Outputs a message when a command is failed
     *
     * @param {ICommand} command
     * @param {CommandContext} commandContext
     * @param {Error} [error]
     */
    output(command: ICommand, commandContext: CommandContext, error?: Error, additionalDependencies?: IDependency[]): void

}
