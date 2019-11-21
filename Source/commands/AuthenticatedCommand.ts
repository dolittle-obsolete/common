/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator, NullMessageOutputter, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependency, IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ILoginService, IContexts } from "@dolittle/tooling.common.login";
import { CommandContext, IFailedCommandOutputter, CommandFailed, NullFailedCommandOutputter, Command } from "./internal";

/**
 * Represents an abstract implementation of an {Command} that ensures that 
 *
 * @export
 * @abstract
 * @class AuthenticatedCommand
 * @extends {Command}
 */
export abstract class AuthenticatedCommand extends Command {
    
    /**
     * Instantiates an instance of {AuthenticatedCommand}.
     * @param {ILoginService} _loginService
     * @param {IContexts} _contexts
     * @param {string} name
     * @param {string} description
     * @param {boolean} isBoilerplateCommand
     * @param {string} [shortDescription=description]
     * @param {IDependency[]} [dependencies=[]]
     */
    constructor(private _loginService: ILoginService, private _contexts: IContexts, name: string, description: string, isBoilerplateCommand: boolean, shortDescription: string = description, dependencies: IDependency[] = []) {
        super(name, description, isBoilerplateCommand, shortDescription, dependencies);
    }
    
    async action(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter = new NullFailedCommandOutputter(), 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        try {
            let {context} = this._contexts.current();
            if (context === undefined || this._contexts.contextHasExpired(context)) {
                let context = await this._loginService.login(dependencyResolvers, outputter, busyIndicator);
                this._contexts.useContext(context);
            }
        } catch (error) {
            failedCommandOutputter.output(this, commandContext, error);
            throw new CommandFailed(this, error);
        }
        await super.action(commandContext, dependencyResolvers, failedCommandOutputter, outputter, busyIndicator)
    }
    
}
