
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { INamespaces, IDefaultCommands, IDefaultCommandGroups, ICanProvideDefaultCommands, ICanProvideDefaultCommandGroups, ICanProvideNamespaces } from "./index";

/**
 * Defines the manager for the commands
 */
export interface ICommandManager {
    
    /**
     * The namespaces
     *
     * @type {INamespaces}
     */
    readonly namespaces: INamespaces
    
    /**
     * The commands 
     *
     * @type {IDefaultCommands}
     */
    readonly commands: IDefaultCommands

    /**
     * The command groups
     *
     * @type {IDefaultCommandGroups}
     */
    readonly commandGroups: IDefaultCommandGroups

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

    /**
     * Loads the tooling command system with the given providers
     *
     * @param {ICanProvideDefaultCommands[]} defaultCommandProviders
     * @param {ICanProvideDefaultCommandGroups[]} defaultCommandGroupsProviders
     * @param {ICanProvideNamespaces} namespaceProviders
     */
    load(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]): void
}