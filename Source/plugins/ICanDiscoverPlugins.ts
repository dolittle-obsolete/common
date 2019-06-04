/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { PluginPackageJson } from "./PluginPackageJson";

/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @interface ICanDiscoverPlugins
 */
export interface ICanDiscoverPlugins {
    /**
     * Discovers plugins and writes them to the plugins configuration so they can be loaded.
     *
     * @memberof ICanDiscoverPlugins
     */
    discover(): void
    /**
     * The discovered plugins
     *
     * @type {PluginPackageJson[]}
     * @memberof ICanDiscoverPlugins
     */
    discoveredPlugins: PluginPackageJson[]

    /**
    * Gets the paths of the Dolittle plugins
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle plugins installed on the system
    * @memberof ICanDiscoverPlugins
    */
    pluginPaths: string[]
}