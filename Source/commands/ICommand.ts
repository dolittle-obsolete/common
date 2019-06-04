/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { CommandContext } from './CommandContext';

/**
 * Represents the bare minimum of a command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
    
    /**
     * The name of the command
     * @memberof ICommand
     */
    readonly name: string
    
    /**
     * The description of the command.
     * @memberof ICommand
     */
    readonly description: string
    
    /**
     * The group of commands the command belongs to, if any
     * @memberof ICommand
     */
    readonly group?: string

    /**
     * The short description of the command. If none is specified the short description is the normal description
     * @memberof ICommand
     */
    readonly shortDescription: string

    /**
     * The action performed when the command is invoked
     *
     * @param {ICanOutputMessages} outputter The system that can output messages 
     * @param {string} cwd The current working directory 
     * @param {string} coreLanguage The core language
     * @param {CommandContext} context
     * @param {string[]} [commandArguments] The arguments for the command
     * @param {string} [namespace] The namespace of the command, if applicable
     * @memberof ICommand
     */
    action(outputter: ICanOutputMessages, cwd: string, coreLanguage: string, context: CommandContext, commandArguments?: string[], namespace?: string): Promise<void>
}