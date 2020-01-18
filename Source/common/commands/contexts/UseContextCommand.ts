/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IContexts, contextsObjectToString, contexts, currentContextToContextsObject } from '@dolittle/tooling.common.login';
import { IDependencyResolvers, PromptDependency, IsNotEmpty, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';

const contextDependency = new PromptDependency(
    'contextName',
    'The context to use',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The name of the context to use'
);
export class UseContextCommand extends Command {

    constructor(private _contexts: IContexts) {
        super('use', 'Use another context', false, undefined, [contextDependency]);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        const dependencyContext = await dependencyResolvers.resolve({}, this.dependencies);
        const contextName = dependencyContext[contextDependency.name];
        const context = contexts.use(contextName);

        outputter.print(contextsObjectToString(currentContextToContextsObject({contextName, context})));
        outputter.print(this._contexts.contextHasExpired(context) ? 'Expired' : 'Not expired');
    }

}
