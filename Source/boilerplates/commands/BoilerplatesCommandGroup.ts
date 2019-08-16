/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, CommandGroup} from '@dolittle/tooling.common.commands';

const name = 'boilerplates';
const description = 'Commands related to boilerplates';

/**
 * Represents an implementation for {ICommandGroup} that extends {CommandGroup} for the boilerplates command group
 *
 * @export
 * @class BoilerplatesCommandGroup
 * @extends {CommandGroup}
 */
export class BoilerplatesCommandGroup extends CommandGroup {
    
    /**
     * Instantiates an instance of {BoilerplatesCommandGroup}.
     * @param {ICommand[]} commands
     */
    constructor(commands: ICommand[]) {
        super(name, commands, description, false);
    }
}
