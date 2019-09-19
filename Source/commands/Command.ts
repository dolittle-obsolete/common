/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator, NullMessageOutputter, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependency, IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICommand, CommandContext, IFailedCommandOutputter, CommandFailed, NullFailedCommandOutputter } from "./index";

/**
 * Represents an abstract implementation of {ICommand}
 *
 * @export
 * @abstract
 * @class Command
 * @implements {ICommand}
 */
export abstract class Command implements ICommand {
    
    /**
     * Instantiates an instance of {Command}.
     * @param {string} _name
     * @param {string} _description
     * @param {boolean} _isBoilerplateCommand
     * @param {string} [_shortDescription=_description]
     * @param {IDependency[]} [_dependencies=[]]
     */
    constructor(private _name: string, private _description: string, private _isBoilerplateCommand: boolean, private _shortDescription: string = _description, private _dependencies: IDependency[] = []) {}
    
    get isBoilerplatesCommand() {return this._isBoilerplateCommand; }

    get name() { return this._name; }
    
    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }
        
    get dependencies() { return this._dependencies; }
    
    async action(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter = new NullFailedCommandOutputter(), 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        try {
            await this.onAction(commandContext, dependencyResolvers, failedCommandOutputter, outputter, busyIndicator);
        } catch (error) {
            failedCommandOutputter.output(this, commandContext, error);
            throw new CommandFailed(this, error);
        }
    }

    abstract onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator): Promise<void>
    
}
