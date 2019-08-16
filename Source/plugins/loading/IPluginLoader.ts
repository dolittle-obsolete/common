/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin, PluginPackage } from '../index';

/**
 * Defines a system for loading plugins from the plugins configuration
 *
 * @export
 * @interface IPluginLoader
 */
export interface IPluginLoader {

     /**
     * Gets the loaded plugins
     *
     * @type {IPlugin[]}
     */
    readonly loaded: IPlugin[]

    /**
     * The packages of the plugins found in the plugins configuration
     *
     * @type {ToolingPackage[]}
     */
    readonly pluginPackages: PluginPackage[]

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

    /**
     * Loads all plugins into the tooling system
     *
     * @returns {Promise<Plugin[]>}
     */
    load(): Promise<IPlugin[]>

}
