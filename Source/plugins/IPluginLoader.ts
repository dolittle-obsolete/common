/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin } from './IPlugin';

/**
 * Responsible for loading plugins from the plugins configuration
 *
 * @export
 * @interface IPluginLoader
 */
export interface IPluginLoader {
    /**
     * Loads all plugins into the tooling system
     *
     * @returns {Plugin[]}
     * @memberof IPluginLoader
     */
    load(): Promise<IPlugin[]>
    
    /**
     * Gets the loaded plugins
     *
     * @type {Plugin[]}
     * @memberof IPluginLoader
     */
    getLoadedPlugins(): Promise<IPlugin[]>
    /**
     * The path of the plugins configuration
     *
     * @type {string}
     * @memberof IPluginLoader
     */
    pluginsPath: string
    /**
     * Whether the loader needs to load the plugins again
     *
     * @type {boolean}
     * @memberof IPluginLoader
     */
    needsReload: boolean
}