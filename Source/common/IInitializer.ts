/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { HostPackage } from './internal';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
/**
 * Defines a system that initializes the tooling system
 */
export interface IInitializer {

    /**
     * Whether the tooling system has been initialized
     *
     * @type {boolean}
     */
    readonly isInitialized: boolean;

    /**
     * Initializes the tooling system
     *
     * @param {IBusyIndicator} busyIndicator
     * @returns {Promise<void>}
     */
    initialize(hostPackage?: HostPackage, dependencyResolvers?: IDependencyResolvers, busyIndicator?: IBusyIndicator): Promise<void>

    /**
     * Reloads plugins into the tooling system
     *
     * @param {IBusyIndicator} busyIndicator
     * @returns {Promise<void>}
     */
    reloadPlugins(busyIndicator?: IBusyIndicator): Promise<void>
}
