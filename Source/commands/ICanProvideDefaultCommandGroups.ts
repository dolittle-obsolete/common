/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICommandGroup } from "./ICommandGroup";

/**
 * Represents a system that can provide the default command groups
 *
 * @export
 * @interface ICanProvideDefaultCommandGroups
 */
export interface ICanProvideDefaultCommandGroups {
    provide(): ICommandGroup[]
}