/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICommandGroup, ICanManageProvidersFor} from "../index";

/**
 * Defines a system that knows about {ICommands} and can manage {ICanProvideCommandGroups} providers
 *
 * @export
 * @interface ICommandGroups
 */
export interface ICommandGroups extends ICanManageProvidersFor<ICommandGroup> {

    /**
     * All the provided command groups
     *
     * @type {ICommandGroup[]}
     */
    readonly commandGroups: ICommandGroup[]

}
