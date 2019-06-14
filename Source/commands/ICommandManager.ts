
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { ICanProvideDefaultCommands, ICanProvideDefaultCommandGroups, ICanProvideNamespaces, INamespace, ICommand, ICommandGroup } from "./index";


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
     * Executes a command
     *
     * @param {string[]} allArguments A list of all the arguments
     * @param {string} currentWorkingDirectory The current working directory 
     * @param {string} coreLanguage The core language
     * @param {Map<string, string>} [commandOptions] The optional arguments/options for the command
     * @param {ICanOutputMessages} [outputter] The system that can output messages
     * @param {IBusyIndicator} [busyIndicator]
     */
    execute(allArguments: string[], currentWorkingDirectory: string, coreLanguage: string, commandOptions?: Map<string, any>, outputter?: ICanOutputMessages, busyIndicator?: IBusyIndicator): Promise<void>

    /**
     * Clears the plugin-providers from the command manager
     *
     */
    clear(): void

    /**
     * Loads the tooling command system with the given providers
     *
     * @param {ICanProvideDefaultCommands[]} defaultCommandProviders
     * @param {ICanProvideDefaultCommandGroups[]} defaultCommandGroupsProviders
     * @param {ICanProvideNamespaces} namespaceProviders
     */
    registerProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]): void
    
    /**
     * Loads the tooling command system with the given default providers
     *
     * @param {ICanProvideDefaultCommands[]} defaultCommandProviders
     * @param {ICanProvideDefaultCommandGroups[]} defaultCommandGroupsProviders
     * @param {ICanProvideNamespaces} namespaceProviders
     */
    registerDefaultProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]): void
}