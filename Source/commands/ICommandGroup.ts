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
     * The commands under this command group
     * @memberof ICommandGroup
     */
    readonly commands: ICommand[]

    /**
     * The name of the command group
     * @memberof ICommandGroup
     */
    readonly name: string
    
    /**
     * The description of the command group.
     * @memberof ICommandGroup
     */
    readonly description: string

    /**
     * The short description of the command group. If none is specified the short description is the normal description
     * @memberof ICommandGroup
     */
    readonly shortDescription: string;
    
}