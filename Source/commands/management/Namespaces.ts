/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanProvideNamespaces, INamespaces, INamespace, DuplicateNamespaceName, ICanValidateProviderFor } from '../internal';

/**
 * Represents an implementation of {INamespaces}
 *
 * @export
 * @class Namespaces
 * @implements {INamespaces}
 */
export class Namespaces implements INamespaces {

    private _defaultProviders: ICanProvideNamespaces[] = [];
    private _nonDefaultProviders: ICanProvideNamespaces[] = [];
    private _namespaces: INamespace[] = [];

    /**
     * Instantiates an instance of {Namespaces}.
     * @param {ILoggers} _logger
     */
    constructor (private _providerValidator: ICanValidateProviderFor<INamespace>, private _logger: ILoggers) {}

    get providers() {
        const providers: ICanProvideNamespaces[] = [];
        this._defaultProviders.forEach(_ => providers.push(_));
        this._nonDefaultProviders.forEach(_ => providers.push(_));
        return providers;
    }

    get namespaces() {
        this.loadNamespaces();
        return this._namespaces;
    }

    clear() {
        this._logger.info('Clearing namespace providers');
        this._nonDefaultProviders = [];
    }

    async register(...providers: ICanProvideNamespaces[]) {
        this._logger.info('Registering namespace providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._nonDefaultProviders.push(...providers);
        this.throwIfDuplicates();
        this._logger.info('Finished registering namespace providers');
    }

    async registerDefault(...providers: ICanProvideNamespaces[]) {

        this._logger.info('Registering default namespace providers');
        await Promise.all(providers.map(_ => this._providerValidator.validate(_)));
        this._defaultProviders.push(...providers);
        this.throwIfDuplicates();

        this._logger.info('Finished registering default namespace providers');
    }

    private loadNamespaces() {
        this._namespaces = [];
        this.providers.forEach(_ => this._namespaces.push(..._.provide()));
    }

    private throwIfDuplicates() {
        const names = this.namespaces.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateNamespaceName(name);
        });
    }

}
