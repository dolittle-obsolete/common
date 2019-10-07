/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICommand, IProviderFor } from "../internal";

/**
 * Defines a system that can provide commands
 *
 * @export
 * @interface ICanProvideCommands
 */
export interface ICanProvideCommands extends IProviderFor<ICommand> {
    
}