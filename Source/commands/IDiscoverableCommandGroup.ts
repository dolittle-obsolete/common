/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommandGroup } from "./index";

/**
 * Defines a discoverable Command Group
 *
 * @export
 * @interface IDiscoverableCommandGroup
 */
export interface IDiscoverableCommandGroup extends ICommandGroup {

    /**
     * Loads the commands
     */
    loadCommands(): Promise<void>
    
}
