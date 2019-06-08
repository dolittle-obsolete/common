/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Logger } from "@dolittle/tooling.common.logging";
import { ICanProvideNamespaces, INamespaces, INamespace } from "../index";

/**
 * Represents an implementation of {INamespaces}
 *
 * @export
 * @class Namespaces
 * @implements {INamespaces}
 */
export class Namespaces implements INamespaces {

    private _defaultProviders: ICanProvideNamespaces[] = []
    private _nonDefaultProviders: ICanProvideNamespaces[] = []
    private _namespaces: INamespace[] = []

    /**
     * Instantiates an instance of {Namespaces}.
     * @param {Logger} _logger
     */
    constructor (private _logger: Logger) {}

    get providers() {
        let providers: ICanProvideNamespaces[] = [];
        this._defaultProviders.forEach(_ => providers.push(_));
        this._nonDefaultProviders.forEach(_ => providers.push(_));
        return providers;
    }

    get namespaces() {
        this.loadNamespaces();
        return this._namespaces;
    } 

    clear() {
        this._nonDefaultProviders = [];
    }
    
    register(...providers: ICanProvideNamespaces[]) {
        this._nonDefaultProviders.push(...providers);
    }

    registerDefault(...providers: ICanProvideNamespaces[]) {
        this._defaultProviders.push(...providers)
    }

    private loadNamespaces() {
        this._logger.info('Providing namespaces');
        this._namespaces = [];
        this.providers.forEach(_ => this._namespaces.push(..._.provide()));
    }

}