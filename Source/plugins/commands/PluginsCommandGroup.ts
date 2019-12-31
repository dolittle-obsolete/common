/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, CommandGroup } from '@dolittle/tooling.common.commands';

const name = 'plugins';
const description = 'Commands related to plugins';

/**
 * Represents an implementation for {ICommandGroup for the plugins command group
 *
 * @export
 * @class PluginsCommandGroup
 * @extends {CommandGroup}
 */
export class PluginsCommandGroup extends CommandGroup {

    /**
     * Instantiates an instance of {PluginsCommandGroup}.
     * @param {ICommand[]} commands
     */
    constructor(commands: ICommand[]) {
        super(name, commands, description, false);
    }
}
