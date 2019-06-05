/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CommandContext } from './index';

/**
 * Define the structure of a Command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
    
    /**
     * The name of the command
     */
    readonly name: string
    
    /**
     * The description of the command.
     */
    readonly description: string

    /**
     * The short description of the command. If none is specified the short description is the normal description
     */
    readonly shortDescription: string
    
    /**
     * The group the command belongs to, if any
     */
    readonly group?: string

    /**
     * The action performed when the command is invoked
     *
     * @param {string} cwd The current working directory 
     * @param {string} coreLanguage The core language
     * @param {CommandContext} context
     * @param {string[]} [commandArguments] The arguments for the command
     * @param {string} [namespace] The namespace of the command, if applicable
     */
    action(cwd: string, coreLanguage: string, context: CommandContext, commandArguments?: string[], namespace?: string): Promise<void>
}