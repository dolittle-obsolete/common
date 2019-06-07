/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICommand, ICanProvideDefaultCommands} from "./index";

/**
 * Defines a system that knows about {ICommands} all commands
 *
 * @export
 * @interface IDefaultCommands
 */
export interface IDefaultCommands {

    /**
     * The instances of {ICanProvideDefaultCommands} providers
     *
     * @type {ICanProvideDefaultCommands[]}
     */
    readonly providers: ICanProvideDefaultCommands[]

    /**
     * All the provided commands
     *
     * @type {ICommand[]}
     */
    readonly commands: ICommand[]
    
    /**
     * Adds {ICanProvideDefaultCommands} providers
     *
     * @param {...ICanProvideDefaultCommands[]} providers
     */
    addProviders(...providers: ICanProvideDefaultCommands[]): void


}