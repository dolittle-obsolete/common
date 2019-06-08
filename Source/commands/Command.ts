/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependency } from "@dolittle/tooling.common.dependencies";
import { ICommand } from "./index";

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
     * @param {string} [_shortDescription=_description]
     * @param {IDependency[]} [_dependencies=[]]
     */
    constructor(private _name: string, private _description: string, private _shortDescription: string = _description, private _dependencies: IDependency[] = []) {}
    
    get name() { return this._name; }
    
    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }
        
    get dependencies() { return this._dependencies; }

    abstract action(currentWorkingDirectory: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, outputter?: ICanOutputMessages, busyIndicator?: IBusyIndicator): Promise<void>
}
