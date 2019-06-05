/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { INamespace } from "../index";

/**
 * Represents a system that can provide namespaces
 *
 * @export
 * @interface ICanProvideNamespaces
 */
export interface ICanProvideNamespaces {
    provide(): INamespace[]
}