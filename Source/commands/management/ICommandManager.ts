/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideCommands, ICanProvideCommandGroups, ICanProvideNamespaces, INamespace, ICommand, ICommandGroup } from "../internal";

/**
 * Defines the manager for the commands
 */
export interface ICommandManager {
    
    /**
     * The namespaces
     *
     * @type {INamespaces}
     */
    readonly namespaces: INamespace[]
    
    /**
     * The commands 
     *
     * @type {IDefaultCommands}
     */
    readonly commands: ICommand[]

    /**
     * The command groups
     *
     * @type {IDefaultCommandGroups}
     */
    readonly commandGroups: ICommandGroup[]
    
    /**
     * Clears the plugin-providers from the command manager
     *
     */
    clear(): void

    /**
     * Loads the tooling command system with the given providers
     *
     * @param {ICanProvideCommands[]} commandProviders
     * @param {ICanProvideCommandGroups[]} commandGroupsProviders
     * @param {ICanProvideNamespaces} namespaceProviders
     */
    registerProviders(commandProviders: ICanProvideCommands[], commandGroupsProviders: ICanProvideCommandGroups[], namespaceProviders: ICanProvideNamespaces[]): Promise<void>
    
    /**
     * Loads the tooling command system with the given default providers
     *
     * @param {ICanProvideCommands[]} commandProviders
     * @param {ICanProvideCommandGroups[]} commandGroupsProviders
     * @param {ICanProvideNamespaces} namespaceProviders
     */
    registerDefaultProviders(commandProviders: ICanProvideCommands[], commandGroupsProviders: ICanProvideCommandGroups[], namespaceProviders: ICanProvideNamespaces[]): Promise<void>
}
