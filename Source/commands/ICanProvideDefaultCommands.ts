/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICommand } from "./ICommand";

/**
 * Represents a system that can provide the default commands
 *
 * @export
 * @interface ICanProvideDefaultCommands
 */
export interface ICanProvideDefaultCommands {
    provide(): ICommand[]
}