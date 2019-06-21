/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommandGroup, ICommand } from "../index";

/**
 * Defines a namespace
 *
 * @export
 * @interface INamespace
 */
export interface INamespace {

    /**
     * Whether or not this namespace has boilerplates associated with it.
     *
     * @type {boolean}
     */
    hasBoilerplates: boolean

    /**
     * The name of the namespace
     *
     * @type {string}
     */
    readonly name: string
    
    /**
     * The description of the namespace.
     * 
     * @type {string}
     */
    readonly description: string

    /**
     * The short description of the namespace. If none is specified the short description is the normal description
     * 
     * @type {string}
     */
    readonly shortDescription: string

    /**
     * The commands belonging to this namespace
     *
     * @type {ICommand[]}
     */
    readonly commands: ICommand[]

    /**
     * The command groups belonging to this namespace
     *
     * @type {ICommandGroup[]}
     */
    readonly commandGroups: ICommandGroup[]
    
    /**
     * Adds default commands to the namespace
     *
     * @param {ICommand[]} commands
     */
    addDefaultCommands(commands: ICommand[]): void

    /**
     * Adds default command groups to the namespace
     *
     * @param {ICommandGroup[]} commandGroups
     */
    addDefaultCommandGroups(commandGroups: ICommandGroup[]): void
    
}