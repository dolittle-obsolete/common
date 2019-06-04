
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { INamespaces } from "./INamespaces";
import { CommandContext } from "./CommandContext";

/**
 * Represents a manager for commands
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
     * @param {ICanOutputMessages} outputter
     * @param {string} cwd
     * @param {string} coreLanguage
     * @param {string} commandOrGroup
     * @param {CommandContext} context
     * @param {string[]} [commandArguments]
     * @param {string} [namespace]
     * @returns {Promise<void>}
     * @memberof ICommandManager
     */
    execute(outputter: ICanOutputMessages, cwd: string, coreLanguage: string, commandOrGroup: string, context: CommandContext, commandArguments?: string[], namespace?: string): Promise<void>
}