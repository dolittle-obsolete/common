/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor } from "./index";

/**
 * Defines a system that manages a {IProviderFor} for a specific type
 *
 * @export
 * @interface ICanManageProvidersFor
 * @template T
 */
export interface ICanManageProvidersFor<T> {

    /**
     * Gets all the providers
     *
     * @type {IProviderFor<T>[]}
     */
    readonly providers: IProviderFor<T>[];

    /**
     * Clears non-default tooling providers
     *
     */
    clear(): void
    
    /**
     * Registers {ICanProvideDefaultCommands} providers
     *
     * @param {...IProviderFor<T>[]} providers
     */
    register(...providers: IProviderFor<T>[]): void


    /**
     * Registers default {ICanProvideDefaultCommands} providers supplied by the tooling itself
     *
     * @param {...IProviderFor<T>[]} providers
     */
    registerDefault(...providers: IProviderFor<T>[]): void
}