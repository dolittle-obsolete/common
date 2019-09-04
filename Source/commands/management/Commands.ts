/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanProvideCommands, ICommands, ICommand, DuplicateCommandName, ICanValidateProviderFor } from "../index";

/**
 * Represents an implementation of {ICommands}
 *
 * @export
 * @interface Commands
 */
export class Commands implements ICommands {
    private _defaultProviders: ICanProvideCommands[] = [];
    private _nonDefaultProviders: ICanProvideCommands[] = [];
    private _commands: ICommand[] = [];

    /**
     * Instantiates an instance of {DefaultCommands}.
     * @param {ILoggers} _logger
     */
    constructor (private _providerValidator: ICanValidateProviderFor<ICommand>, private _logger: ILoggers) {}

    get providers() {
        let providers: ICanProvideCommands[] = [];
        this._defaultProviders.forEach(_ => providers.push(_));
        this._nonDefaultProviders.forEach(_ => providers.push(_));
        return providers;
    }

    get commands() {
        this.loadCommands();
        return this._commands;
    } 

    clear() {
        this._logger.info('Clearing command providers')
        this._nonDefaultProviders = [];
    }
    
    async register(...providers: ICanProvideCommands[]) {
        this._logger.info('Registering command providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._nonDefaultProviders.push(...providers);
        this.throwIfDuplicates();
        this._logger.info('Finished registering command providers');
    }

    async registerDefault(...providers: ICanProvideCommands[]) {
        this._logger.info('Registering default command providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._defaultProviders.push(...providers);
        this.throwIfDuplicates();
        this._logger.info('Finished registering default command providers');
    }

    private throwIfDuplicates() {
        let names = this.commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
    private loadCommands() {
        this._commands = [];
        this.providers.forEach(_ => this._commands.push(..._.provide()));
    }

}
