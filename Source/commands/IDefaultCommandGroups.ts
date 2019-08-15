/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICommandGroup, ICanManageProvidersFor} from "./index";

/**
 * Defines a system that knows about {ICommands} all commands and can manage {ICanProvideDefaultCommandGroups} providers
 *
 * @export
 * @interface IDefaultCommandGroups
 */
export interface IDefaultCommandGroups extends ICanManageProvidersFor<ICommandGroup> {

    /**
     * All the provided command groups
     *
     * @type {ICommandGroup[]}
     */
    readonly commandGroups: ICommandGroup[]

}
