/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IContexts, contextsObjectToString } from '@dolittle/tooling.common.login';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';

export class ListContextsCommand extends Command {

    constructor(private _contexts: IContexts) {
        super('list', 'Lists all contexts', false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        const contexts = this._contexts.all();
        outputter.print(contextsObjectToString(contexts));
    }

}
