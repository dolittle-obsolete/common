/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * Defines a provider
 *
 * @export
 * @interface IProviderFor
 * @template T What to provide
 */
export interface IProviderFor<T> {

    /**
     * Provides instances of {T}
     *
     * @returns {T[]}
     */
    provide(): T[]
}
