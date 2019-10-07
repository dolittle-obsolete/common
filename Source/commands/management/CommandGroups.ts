/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanProvideCommandGroups, ICommandGroups, ICommandGroup, DuplicateCommandGroupName, ICanValidateProviderFor } from "../internal";

/**
 * Represents an implementation of {ICommandGroups}
 *
 * @export
 * @interface CommandGroups
 */
export class CommandGroups implements ICommandGroups {

    private _defaultProviders: ICanProvideCommandGroups[] = [];
    private _nonDefaultProviders: ICanProvideCommandGroups[] = [];
    private _commandGroups: ICommandGroup[] = []

    /**
     * Instantiates an instance of {DefaultCommandGroups}.
     * @param {ILoggers} _logger
     */
    constructor (private _providerValidator: ICanValidateProviderFor<ICommandGroup>, private _logger: ILoggers) {}

    get providers() {
        let providers: ICanProvideCommandGroups[] = [];
        this._defaultProviders.forEach(_ => providers.push(_));
        this._nonDefaultProviders.forEach(_ => providers.push(_));
        return providers;
    }

    get commandGroups() {
        this.loadCommandGroups();
        return this._commandGroups;
    } 
    
    clear() {
        this._logger.info('Clearing command group providers')
        this._nonDefaultProviders = [];
    }

    async register(...providers: ICanProvideCommandGroups[]) {
        this._logger.info('Registering command group providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._nonDefaultProviders.push(...providers);
        this.throwIfDuplicates();
        this._logger.info('Finished registering command group providers');
    }
    
    async registerDefault(...providers: ICanProvideCommandGroups[]) {
        this._logger.info('Registering default command group providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._defaultProviders.push(...providers);
        this.throwIfDuplicates();
        this._logger.info('Finished registering default command group providers');
    }

    private loadCommandGroups() {
        this._commandGroups = [];
        this.providers.forEach(_ => this._commandGroups.push(..._.provide()));
    }
    
    private throwIfDuplicates() {
        let names = this.commandGroups.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandGroupName(name);
        })
    }
}