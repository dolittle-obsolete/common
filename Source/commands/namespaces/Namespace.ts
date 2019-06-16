/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { INamespace, ICommand, ICommandGroup } from "../index";

/**
 * Represents an abstract implementation of {INamespace}
 *
 * @export
 * @abstract
 * @class Namespace
 * @implements {INamespace}
 */
export abstract class Namespace implements INamespace {
    
    /**
     * Instantiates an instance of {Namespace}.
     * @param {string} _name
     * @param {ICommand[]} _commands
     * @param {ICommandGroup[]} _commandGroups
     * @param {string} _description
     * @param {string} [_shortDescription=_description]
     */
    constructor(private _name: string, private _commands: ICommand[], private _commandGroups: ICommandGroup[],
        private _description: string, private _shortDescription: string = _description) {}

    get name() { return this._name; }
    
    get commands() { return this._commands; }

    get commandGroups() { return this._commandGroups; }
    
    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }
    
}
