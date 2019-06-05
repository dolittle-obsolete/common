/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideNamespaces, INamespace } from "../index";

/**
 * Represents all namespaces
 *
 * @export
 * @interface INamespaces
 */
export interface INamespaces {
    /**
     * The instances of {ICanProvideNamespaces}
     *
     * @type {ICanProvideNamespaces[]}
     * @memberof INamespaces
     */
    readonly providers: ICanProvideNamespaces[]
    /**
     * All the provided namespaces
     *
     * @type {INamespace[]}
     * @memberof INamespaces
     */
    readonly namespaces: INamespace[]
    /**
     * Adds {ICanProvideNamespaces} providers
     *
     * @param {...[ICanProvideNamespaces[]]} providers
     * @memberof INamespaces
     */
    addProviders(...providers: ICanProvideNamespaces[]): void


}