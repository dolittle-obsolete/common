/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '@dolittle/tooling.common.packages';
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
     * @returns {Promise<Plugin[]>}
     */
    getLoaded(): Promise<IPlugin[]>
    
    /**
     * The packages of the plugins found in the plugins configuration
     *
     * @returns {Promise<ToolingPackage[]>}
     */
    getPluginPackages(): Promise<ToolingPackage[]>

    /**
     * The path of the plugins configuration
     *
     * @type {string}
     */
    readonly pluginsConfigurationPath: string

    /**
     * Whether the loader needs to load the plugins again
     *
     * @type {boolean}
     */
    needsReload: boolean
}