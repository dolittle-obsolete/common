/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { INamespace, IProviderFor } from "../internal";

/**
 * Defines a system that can provide namespaces
 *
 * @export
 * @interface ICanProvideNamespaces
 */
export interface ICanProvideNamespaces extends IProviderFor<INamespace> {

}