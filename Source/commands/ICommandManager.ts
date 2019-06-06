
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { INamespaces } from "./index";

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
     * @param {ICanOutputMessages} outputter The system that can output messages
     * @param {string[]} [commandArguments]
     * @param {string} [namespace]
     * @returns {Promise<void>}
     * @memberof ICommandManager
     */
    execute(currentWorkingDirectory: string, coreLanguage: string, commandOrGroupName: string, outputter: ICanOutputMessages, commandArguments?: string[], namespace?: string): Promise<void>
}