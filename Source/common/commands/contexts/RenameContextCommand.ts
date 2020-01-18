/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IContexts, contextsObjectToString, contexts } from '@dolittle/tooling.common.login';
import { IDependencyResolvers, PromptDependency, IsNotEmpty, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';

const oldNameDependency = new PromptDependency(
    'oldName',
    'The context to rename',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The name of the context to rename'
);
const newNameDependency = new PromptDependency(
    'nedName',
    'The new context name',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The new name of the context'
);
export class RenameContextCommand extends Command {

    constructor(private _contexts: IContexts) {
        super('rename', 'Renames a context', false, undefined, [oldNameDependency, newNameDependency]);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        const context = await dependencyResolvers.resolve({}, this.dependencies);
        const oldName = context[oldNameDependency.name];
        const newName = context[newNameDependency.name];
        contexts.rename(oldName, newName);
    }

}
