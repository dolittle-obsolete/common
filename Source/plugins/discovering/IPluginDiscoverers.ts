/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanDiscoverPlugins, PluginPackage } from '../internal';

/**
 * Defines a system that knows about {ICanDiscoverPlugins} plugin discoverers
 *
 * @export
 * @interface IPluginDiscoverers
 */
export interface IPluginDiscoverers {

    /**
     * The plugin discoverers
     *
     * @type {ICanDiscoverPlugins[]}
     */
    readonly pluginDiscoverers: ICanDiscoverPlugins[]

    /**
     * Adds discoverers
     *
     * @param {...ICanDiscoverPlugins[]} pluginDiscoverers
     */
    add(...pluginDiscoverers: ICanDiscoverPlugins[]): void

    /**
     * Discovers plugins
     * @param {string} [folder] The folder to start discovering from
     */
    discover(folder?: string): Promise<void>

    /**
     * The discovered plugin packages
     *
     * @type {PluginPackage[]}
     */
    discovered: PluginPackage[]

    /**
    * Gets the paths of the Dolittle plugins
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    */
    paths: string[]
}
