/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommandGroup, IProviderFor } from "../index";

/**
 * Defines a system that can provide command groups
 *
 * @export
 * @interface ICanProvideCommandGroups
 */
export interface ICanProvideCommandGroups extends IProviderFor<ICommandGroup> {
    
}