
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { INamespaces, CommandContext } from "./index";

/**
 * Defines a manager for commands
 */
export interface ICommandManager {
    
    /**
     * The namespaces
     *
     * @type {INamespaces}
     * @memberof ICommandManager
     */
    readonly namespaces: INamespaces

    /**
     * Executes a command
     *
     * @param {string} currentWorkingDirectory
     * @param {string} coreLanguage
     * @param {string} commandOrGroupName
     * @param {CommandContext} context
     * @param {string[]} [commandArguments]
     * @param {string} [namespace]
     * @returns {Promise<void>}
     * @memberof ICommandManager
     */
    execute(currentWorkingDirectory: string, coreLanguage: string, commandOrGroupName: string, context: CommandContext, commandArguments?: string[], namespace?: string): Promise<void>
}