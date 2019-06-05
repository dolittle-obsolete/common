/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideNamespaces, INamespace } from "../index";

/**
 * Defines a system that knows about {INamespace} all namespaces
 *
 * @export
 * @interface INamespaces
 */
export interface INamespaces {

    /**
     * The instances of {ICanProvideNamespaces} providers
     *
     * @type {ICanProvideNamespaces[]}
     */
    readonly providers: ICanProvideNamespaces[]

    /**
     * All the provided namespaces
     *
     * @type {INamespace[]}
     */
    readonly namespaces: INamespace[]
    
    /**
     * Adds {ICanProvideNamespaces} providers
     *
     * @param {...ICanProvideNamespaces[]} providers
     */
    addProviders(...providers: ICanProvideNamespaces[]): void


}