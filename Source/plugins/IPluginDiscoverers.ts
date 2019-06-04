/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanDiscoverPlugins } from "./ICanDiscoverPlugins";
import { PluginPackageJson } from "./PluginPackageJson";

/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @interface IPluginDiscoverers
 */
export interface IPluginDiscoverers {
    /**
     * The plugin discoverers
     *
     * @type {ICanDiscoverPlugins[]}
     * @memberof IPluginDiscoverers
     */
    readonly pluginDiscoverers: ICanDiscoverPlugins[]
    /**
     * Adds discoverers
     *
     * @param {...ICanDiscoverPlugins[]} pluginDiscoverers
     * @memberof IPluginDiscoverers
     */
    addDiscoverers(...pluginDiscoverers: ICanDiscoverPlugins[]): void

    /**
     * Discovers plugins
     *
     * @memberof IPluginDiscoverers
     */
    discover(): void

    /**
     * The discovered plugin packages
     *
     * @type {PluginPackageJson[]}
     * @memberof IPluginDiscoverers
     */
    discoveredPlugins: PluginPackageJson[]

    /**
    * Gets the paths of the Dolittle plugins
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    * @memberof IPluginDiscoverers
    */
    pluginPaths: string[]
}