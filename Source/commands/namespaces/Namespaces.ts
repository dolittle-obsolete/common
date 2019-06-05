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
 * @interface Namespaces
 */
export class Namespaces implements INamespaces {
    
    private _namespaces: INamespace[] = []

    constructor (private _providers: ICanProvideNamespaces[], private _logger: Logger) {}

    get providers() {return this._providers; }

    get namespaces() {
        this.loadNamespaces();
        return this._namespaces;
    } 
    
    addProviders(...providers: ICanProvideNamespaces[]) {
        this._providers.push(...providers);
    }

    private loadNamespaces() {
        this._logger.info('Providing namespaces');
        this._namespaces = [];
        this.providers.forEach(_ => this._namespaces.push(..._.provide()));
    }

}