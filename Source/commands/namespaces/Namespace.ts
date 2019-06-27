/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { INamespace, ICommand, ICommandGroup, DuplicateCommandName, DuplicateCommandGroupName } from "../index";

/**
 * Represents an abstract implementation of {INamespace}
 *
 * @export
 * @abstract
 * @class Namespace
 * @implements {INamespace}
 */
export class Namespace implements INamespace {
    
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
    
    hasBoilerplates = false;
    
    get name() { return this._name; }
    
    get commands() { return this._commands; }

    get commandGroups() { return this._commandGroups; }
    
    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }

    addDefaultCommands(commands: ICommand[]): void {
        this._commands.push(...commands);
        this.throwIfDuplicateCommands();
    }
    addDefaultCommandGroups(commandGroups: ICommandGroup[]): void {
        this._commandGroups.push(...commandGroups);
        this.throwIfDuplicateCommandGroups();
    }

    private throwIfDuplicateCommands() {
        let names = this.commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        })
    }
    private throwIfDuplicateCommandGroups() {
        let names = this.commandGroups.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandGroupName(name);
        })
    }
    
}
