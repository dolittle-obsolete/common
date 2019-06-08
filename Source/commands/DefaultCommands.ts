/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Logger } from "@dolittle/tooling.common.logging";
import { ICanProvideDefaultCommands, IDefaultCommands, ICommand } from "./index";

/**
 * Represents an implementation of {IDefaultCommands}
 *
 * @export
 * @interface DefaultCommands
 */
export class DefaultCommands implements IDefaultCommands {
    private _defaultProviders: ICanProvideDefaultCommands[] = [];
    private _nonDefaultProviders: ICanProvideDefaultCommands[] = [];
    private _commands: ICommand[] = [];

    /**
     * Instantiates an instance of {DefaultCommands}.
     * @param {Logger} _logger
     */
    constructor (private _logger: Logger) {}

    get providers() {
        let providers: ICanProvideDefaultCommands[] = [];
        this._defaultProviders.forEach(_ => providers.push(_));
        this._nonDefaultProviders.forEach(_ => providers.push(_));
        return providers;
    }

    get commands() {
        this.loadCommands();
        return this._commands;
    } 

    clear() {
        this._nonDefaultProviders = [];
    }
    
    register(...providers: ICanProvideDefaultCommands[]) {
        this._nonDefaultProviders.push(...providers);
    }

    registerDefault(...providers: ICanProvideDefaultCommands[]) {
        this._defaultProviders.push(...providers);
    }

    private loadCommands() {
        this._logger.info('Providing default commands');
        this._commands = [];
        this.providers.forEach(_ => this._commands.push(..._.provide()));
    }

}