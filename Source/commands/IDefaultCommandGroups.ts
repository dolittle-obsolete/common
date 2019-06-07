/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICommandGroup, ICanProvideDefaultCommandGroups} from "./index";

/**
 * Defines a system that knows about {ICommands} all commands
 *
 * @export
 * @interface IDefaultCommandGroups
 */
export interface IDefaultCommandGroups {

    /**
     * The instances of {ICanProvideDefaultCommandGroups} providers
     *
     * @type {ICanProvideDefaultCommandGroups[]}
     */
    readonly providers: ICanProvideDefaultCommandGroups[]

    /**
     * All the provided command groups
     *
     * @type {ICommandGroup[]}
     */
    readonly commandGroups: ICommandGroup[]
    
    /**
     * Adds {ICanProvideDefaultCommandGroups} providers
     *
     * @param {...ICanProvideDefaultCommandGroups[]} providers
     */
    addProviders(...providers: ICanProvideDefaultCommandGroups[]): void


}