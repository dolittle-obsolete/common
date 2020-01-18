/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICommand, CommandContext, IFailedCommandOutputter } from '../internal';
import { IDependency } from '@dolittle/tooling.common.dependencies';

/**
 * Represents a null-implementation of {IFailedCommandOutputter}
 */
export class NullFailedCommandOutputter implements IFailedCommandOutputter {

    output(command: ICommand, commandContext: CommandContext,  error?: Error, additionalDependencies: IDependency[] = []) {}
}
