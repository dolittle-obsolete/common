/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin } from './index';

/**
 * Defines a system that knows about {IPlugin} plugins
 *
 * @export
 * @interface IPlugins
 */
export interface IPlugins {
    
    /**
     * The loaded plugins
     *
     * @returns {Promise<IPlugin[]>}
     */
    getPlugins: Promise<IPlugin[]>

    /**
     * Triggers the tooling to discover new plugins and load them
     */
    discoverNewPlugins(): void
}