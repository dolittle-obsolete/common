/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependency, IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { CommandContext, IFailedCommandOutputter } from './internal';

/**
 * Define the structure of a Command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {

    /**
     * Whether or not this is a common on boilerplates
     *
     * @type {boolean}
     */
    readonly isBoilerplatesCommand: boolean;
    
    /**
     * The name of the command
     * @type {string}
     */
    readonly name: string
    
    /**
     * The description of the command
     * @type {string}
     */
    readonly description: string

    /**
     * The short description of the command
     * @type {string}
     */
    readonly shortDescription: string
    
    /**
     * The pre-defined dependencies of a command
     * @type {string}
     */
    readonly dependencies: IDependency[]

    /**
     * The action performed when the command is invoked
     *
     * @param {CommandContext} commandContext
     * @param {IDependencyResolvers} dependencyResolvers
     * @param {IFailedCommandOutputter} [failedCommandOutputter]
     * @param {ICanOutputMessages} [outputter]
     * @param {IBusyIndicator} [busyIndicator]
     * @returns {Promise<void>}
     */
    action(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter?: IFailedCommandOutputter, outputter?: ICanOutputMessages, busyIndicator?: IBusyIndicator): Promise<void>

    /**
     * The actual action that is performed when action is called on the command
     *
     * @param {CommandContext} commandContext
     * @param {IDependencyResolvers} dependencyResolvers
     * @param {IFailedCommandOutputter} failedCommandOutputter
     * @param {ICanOutputMessages} outputter
     * @param {IBusyIndicator} busyIndicator
     * @returns {Promise<void>}
     */
    onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator): Promise<void>

}
