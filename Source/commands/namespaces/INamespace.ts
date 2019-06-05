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
     * Whether or not default commands and command groups are included in this namespace
     *
     * @type {boolean}
     */
    readonly includeDefault: boolean
    
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
    
}