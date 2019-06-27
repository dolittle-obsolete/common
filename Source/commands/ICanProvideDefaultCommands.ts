/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICommand, IProviderFor } from "./index";

/**
 * Defines a system that can provide default commands
 *
 * @export
 * @interface ICanProvideDefaultCommands
 */
export interface ICanProvideDefaultCommands extends IProviderFor<ICommand> {
    
}