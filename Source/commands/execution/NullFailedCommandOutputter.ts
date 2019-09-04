/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency } from "@dolittle/tooling.common.dependencies";
import { ICommand, CommandContext, IFailedCommandOutputter } from "../index";

/**
 * Represents a null-implementation of {IFailedCommandOutputter}
 */
export class NullFailedCommandOutputter implements IFailedCommandOutputter {
    
    output(command: ICommand, commandContext: CommandContext, dependencies: IDependency[]) {}
}
