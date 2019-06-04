/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanDiscoverPlugins } from "./ICanDiscoverPlugins";
import { PluginPackage } from "./PluginPackage";
import { IPluginDiscoverers } from "./IPluginDiscoverers";

/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @class PluginDiscoverers
 */
export class PluginDiscoverers implements IPluginDiscoverers {
    
    constructor (pluginDiscoverers: ICanDiscoverPlugins[]) {
        this.pluginDiscoverers = pluginDiscoverers;
    }
    readonly pluginDiscoverers: ICanDiscoverPlugins[]
    /**
     * Adds discoverers
     *
     * @param {...ICanDiscoverPlugins[]} pluginDiscoverers
     * @memberof IPluginDiscoverers
     */
    addDiscoverers(...pluginDiscoverers: ICanDiscoverPlugins[]) {
        this.pluginDiscoverers.push(...pluginDiscoverers);
    }

    /**
     * Discovers plugins
     *
     * @memberof IPluginDiscoverers
     */
    discover() {
        this.pluginDiscoverers.forEach(_ => _.discover());
    }

    get discoveredPlugins() {
        let plugins: PluginPackage[] = [];
        this.pluginDiscoverers.forEach(_ => plugins.push(..._.discoveredPlugins));
        return plugins;
    }

    get pluginPaths() {
        let paths: string[] = [];
        this.pluginDiscoverers.forEach(_ => paths.push(..._.pluginPaths));
        return paths;
    }
}