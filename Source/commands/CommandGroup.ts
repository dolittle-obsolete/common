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
export abstract class CommandGroup implements ICommandGroup {
    
    /**
     * Instantiates an instance of {CommandGroup}.
     * @param {string} _name
     * @param {ICommand[]} _commands
     * @param {string} _description
     * @param {string} [_shortDescription=_description]
     */
    constructor(private _name: string, private _commands: ICommand[], private _description: string, private _shortDescription: string = _description) {}
    
    get name() { return this._name; }

    get commands() { return this._commands; }
    
    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }
}
