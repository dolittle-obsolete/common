/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { INamespace, ICanManageProvidersFor } from "../index";

/**
 * Defines a system that knows about {INamespace} all namespaces  and can manage {ICanProvideNamespaces} providers
 *
 * @export
 * @interface INamespaces
 */
export interface INamespaces extends ICanManageProvidersFor<INamespace>{

    /**
     * All the provided namespaces
     *
     * @type {INamespace[]}
     */
    readonly namespaces: INamespace[]
    

}