/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICommandGroup, ICommand } from "./index";

/**
 * Represents an abstract implementation of {ICommandGroup}
 *
 * @export
 * @abstract
 * @class CommandGroup
 * @implements {ICommandGroup}
 */
export class CommandGroup implements ICommandGroup {
    
    /**
     * Instantiates an instance of {CommandGroup}.
     * @param {string} _name
     * @param {ICommand[]} _commands
     * @param {string} _description
     * @param {boolean} _isBoilerplateCommandGroup
     * @param {string} [_shortDescription=_description]
     */
    constructor(private _name: string, private _commands: ICommand[], private _description: string, private _isBoilerplateCommandGroup: boolean, private _shortDescription: string = _description) {}
    
    get isBoilerplatesCommandGroup() { return this._isBoilerplateCommandGroup; }

    get name() { return this._name; }

    get description() { return this._description; }
    
    get shortDescription() { return this._shortDescription; }

    getCommands() { return Promise.resolve(this._commands); }
}
