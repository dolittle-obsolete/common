/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommandGroup } from "./index";

/**
 * Represents the a discoverable command group
 *
 * @export
 * @interface IDiscoverableCommandGroup
 */
export interface IDiscoverableCommandGroup extends ICommandGroup {
    /**
     * Loads the commands
     *
     * @memberof IDiscoverableCommandGroup
     */
    loadCommands(): void
    
}