/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IContexts } from '@dolittle/tooling.common.login';
import { IDependencyResolvers, PromptDependency, IsNotEmpty, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';

const contextDependency = new PromptDependency(
    'contextName',
    'The context to remove',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The name of the context to remove'
);
export class RemoveContextCommand extends Command {

    constructor(private _contexts: IContexts) {
        super('remove', 'Removes a context', false, undefined, [contextDependency]);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        const dependencyContext = await dependencyResolvers.resolve({}, this.dependencies);
        const contextName = dependencyContext[contextDependency.name];
        const result = this._contexts.delete(contextName);

        outputter.print(result ? `Deleted context '${contextName}'` : `No context with name '${contextName}'`);
    }

}
