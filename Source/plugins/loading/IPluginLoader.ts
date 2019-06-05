/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin } from '../index';

/**
 * Defines a system for loading plugins from the plugins configuration
 *
 * @export
 * @interface IPluginLoader
 */
export interface IPluginLoader {

    /**
     * Loads all plugins into the tooling system
     *
     * @returns {Plugin[]}
     */
    load(): Promise<IPlugin[]>
    
    /**
     * Gets the loaded plugins
     *
     * @type {Plugin[]}
     */
    getLoaded(): Promise<IPlugin[]>
    
    /**
     * The path of the plugins configuration
     *
     * @type {string}
     */
    pluginsConfigurationPath: string

    /**
     * Whether the loader needs to load the plugins again
     *
     * @type {boolean}
     */
    needsReload: boolean
}