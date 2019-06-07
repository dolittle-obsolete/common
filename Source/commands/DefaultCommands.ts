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
    
    private _commands: ICommand[] = []

    constructor (private _providers: ICanProvideDefaultCommands[], private _logger: Logger) {}

    get providers() {return this._providers; }

    get commands() {
        this.loadCommands();
        return this._commands;
    } 
    
    addProviders(...providers: ICanProvideDefaultCommands[]) {
        this._providers.push(...providers);
    }

    private loadCommands() {
        this._logger.info('Providing default commands');
        this._commands = [];
        this.providers.forEach(_ => this._commands.push(..._.provide()));
    }

}