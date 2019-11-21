/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from "@dolittle/tooling.common.commands";
import { IContexts, contextsObjectToString, currentContextToContextsObject } from '@dolittle/tooling.common.login';
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";

export class CurrentContextCommand extends Command {
    
    constructor(private _contexts: IContexts) {
        super('current', 'Shows the current context', false)
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let contexts = this._contexts.current();
        outputter.print(contextsObjectToString(currentContextToContextsObject(contexts)));
        if (contexts.context !== undefined) outputter.print(this._contexts.contextHasExpired(contexts.context)? 'Expired' : 'Not expired');
    }
}
