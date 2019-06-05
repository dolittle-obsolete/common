/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommandGroup, ICommand } from "../index";

/**
 * Represents a namespace
 *
 * @export
 * @interface INamespace
 */
export interface INamespace {
    /**
     * Whether or not default commands and command groups a are excluded from this namespace
     *
     * @type {boolean}
     * @memberof INamespace
     */
    readonly excludeDefault: boolean
    /**
     * The name of the namespace
     *
     * @type {string}
     * @memberof INamespace
     */
    readonly name: string
    
    /**
     * The description of the namespace.
     * @memberof ICommand
     */
    readonly description: string

    /**
     * The short description of the namespace. If none is specified the short description is the normal description
     * @memberof ICommand
     */
    readonly shortDescription: string

    /**
     * The commands belonging to this namespace
     *
     * @type {ICommand[]}
     * @memberof INamespace
     */
    readonly commands: ICommand[]
    /**
     * The command groups belonging to this namespace
     *
     * @type {ICommandGroup[]}
     * @memberof INamespace
     */
    readonly commandGroups: ICommandGroup[]    
    
}