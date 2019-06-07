/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependency } from "@dolittle/tooling.common.dependencies";

/**
 * Define the structure of a Command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
    
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
     * @param {string} cwd The current working directory 
     * @param {string} coreLanguage The core language
     * @param {string[]} [commandArguments] The arguments for the command
     * @param {string} [namespace] The namespace of the command, if applicable
     * @param {ICanOutputMessages} [outputter] The system that can output messages
     * @param {IBusyIndicator} [busyIndicator]
     */
    action(cwd: string, coreLanguage: string, commandArguments?: string[], namespace?: string, outputter?: ICanOutputMessages, busyIndicator?: IBusyIndicator): Promise<void>
}
