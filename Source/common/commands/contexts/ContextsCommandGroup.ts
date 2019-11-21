/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandGroup, ICommand } from '@dolittle/tooling.common.commands';


export class ContextsCommandGroup extends CommandGroup {

    constructor(commands: ICommand[]) {
        super('contexts', commands, 'Commands related to login contexts', false)
    }
}
