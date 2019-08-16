/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PluginPackage } from "../index";

/**
 * Defines a system that can discovering plugins
 *
 * @export
 * @interface ICanDiscoverPlugins
 */
export interface ICanDiscoverPlugins {

    /**
     * Discovers plugins and writes them to the plugins configuration so they can be loaded.
     */
    discover(): void

    /**
     * The discovered plugins
     *
     * @type {PluginPackage[]}
     */
    discovered: PluginPackage[]

    /**
    * Gets the paths of the Dolittle plugins
    *
    * @type {string[]} Filesystem paths of the Dolittle plugins installed on the system
    */
    pluginPaths: string[]
}
