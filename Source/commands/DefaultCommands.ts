/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Logger } from "@dolittle/tooling.common.logging";
import { ICanProvideDefaultCommands, IDefaultCommands, ICommand, DuplicateCommandName, ICanValidateProviderFor } from "./index";

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
    constructor (private _providerValidator: ICanValidateProviderFor<ICommand>, private _logger: Logger) {}

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
        providers.forEach(this._providerValidator.validate);
        this._nonDefaultProviders.push(...providers);
        this.throwIfDuplicates();
    }

    registerDefault(...providers: ICanProvideDefaultCommands[]) {
        providers.forEach(this._providerValidator.validate);
        this._defaultProviders.push(...providers);
        this.throwIfDuplicates();
    }

    private throwIfDuplicates() {
        let names = this.commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
    private loadCommands() {
        this._logger.info('Providing default commands');
        this._commands = [];
        this.providers.forEach(_ => this._commands.push(..._.provide()));
    }

}