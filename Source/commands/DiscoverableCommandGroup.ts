/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICommand, IDiscoverableCommandGroup } from './internal';

/**
 * Represents an abstract implementation of {IDiscoverableCommandGroup}
 *
 * @export
 * @abstract
 * @class DiscoverableCommandGroup
 * @implements {IDiscoverableCommandGroup}
 */
export abstract class DiscoverableCommandGroup implements IDiscoverableCommandGroup {

    /**
     * Instantiates an instance of {CommandGroup}.
     * @param {string} _name
     * @param {string} _description
     * @param {string} [_shortDescription=_description]
     */
    constructor(private _name: string, private _description: string, private _isBoilerplatesCommandGroup: boolean, private _shortDescription: string = _description) {}

    get isBoilerplatesCommandGroup() { return this._isBoilerplatesCommandGroup; }

    get name() { return this._name; }

    get description() { return this._description; }

    get shortDescription() { return this._shortDescription; }

    abstract getCommands(): Promise<ICommand[]>;

    abstract loadCommands(): Promise<void>;
}
