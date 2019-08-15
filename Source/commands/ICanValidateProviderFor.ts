/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor } from "./index";

/**
 * Defines a provider
 *
 * @export
 * @interface ICanValidateProviderFor
 * @template T What to provide
 */
export interface ICanValidateProviderFor<T> {
    
    /**
     * Validates a provider for {T}
     *
     * @returns {Promise<T[]>}
     */
    validate(provider: IProviderFor<T>): Promise<void>
}
