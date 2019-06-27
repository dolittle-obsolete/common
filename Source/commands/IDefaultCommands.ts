/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICommand, ICanManageProvidersFor} from "./index";

/**
 * Defines a system that knows about {ICommands} all commands and can manage {ICanProvideDefaultCommands} providers
 *
 * @export
 * @interface IDefaultCommands
 */
export interface IDefaultCommands extends ICanManageProvidersFor<ICommand> {

    /**
     * All the provided commands
     *
     * @type {ICommand[]}
     */
    readonly commands: ICommand[]
    
}