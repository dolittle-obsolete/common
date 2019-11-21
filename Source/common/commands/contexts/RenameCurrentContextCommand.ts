/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from "@dolittle/tooling.common.commands";
import { IContexts, contextsObjectToString, contexts } from '@dolittle/tooling.common.login';
import { IDependencyResolvers, PromptDependency, IsNotEmpty, argumentUserInputType } from "@dolittle/tooling.common.dependencies";
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";

const newNameDependency = new PromptDependency(
    'nedName',
    'The new context name',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The new name of the context'
);
export class RenameCurrentContextCommand extends Command {
    
    constructor(private _contexts: IContexts) {
        super('rename', 'Renames a context', false, undefined, [newNameDependency])
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let context = await dependencyResolvers.resolve({}, this.dependencies) 
        let newName = context[newNameDependency.name]; 
        contexts.renameCurrent(newName);
    }

}
