/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand } from "./index";

/**
 * Defines the structure of a Command Group
 *
 * @export
 * @interface ICommandGroup
 */
export interface ICommandGroup {
    
    /**
     * Whether or not this is a common on boilerplates
     *
     * @type {boolean}
     */
    readonly isBoilerplatesCommandGroup: boolean;

    /**
     * The name of the command group
     */
    readonly name: string
    
    /**
     * The description of the command group.
     */
    readonly description: string

    /**
     * The short description of the command group. If none is specified the short description is the normal description
     */
    readonly shortDescription: string;

    /**
     * The commands under this command group
     * 
     * @returns {Promise<ICommand[]>}
     */
    getCommands(): Promise<ICommand[]>
    
}