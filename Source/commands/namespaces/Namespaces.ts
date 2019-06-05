/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanProvideNamespaces, INamespaces, INamespace } from "../index";



/**
 * Represents all namespaces
 *
 * @export
 * @interface Namespaces
 */
export class Namespaces implements INamespaces {
    
    private _namespaces: INamespace[] = []

    constructor (private _providers: ICanProvideNamespaces[]) {}

    get providers() {return this._providers; }

    get namespaces() {
        this.loadNamespaces();
        return this._namespaces;
    } 
    
    addProviders(...providers: ICanProvideNamespaces[]) {
        this._providers.push(...providers);
    }

    private loadNamespaces() {
        this.providers.forEach(_ => this._namespaces.push(..._.provide()));
    }

}