/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanDiscoverPlugins, PluginPackage, IPluginDiscoverers } from "../index";

/**
 * Represents an implementation of {IPluginDiscoverers}
 *
 * @export
 * @class PluginDiscoverers
 */
export class PluginDiscoverers implements IPluginDiscoverers {
    private _hasDiscovered = false;
    
    /**
     * Instantiates an instance of {PluginDiscoverers}.
     * @param {ICanDiscoverPlugins[]} pluginDiscoverers
     */
    constructor (pluginDiscoverers: ICanDiscoverPlugins[]) {
        this.pluginDiscoverers = pluginDiscoverers;
    }

    readonly pluginDiscoverers: ICanDiscoverPlugins[]
    
    get discoveredPlugins() {
        if (! this._hasDiscovered) this.discover();
        let plugins: PluginPackage[] = [];
        this.pluginDiscoverers.forEach(_ => plugins.push(..._.discovered));
        return plugins;
    }
    
    get pluginPaths() {
        if (! this._hasDiscovered) this.discover();
        let paths: string[] = [];
        this.pluginDiscoverers.forEach(_ => paths.push(..._.pluginPaths));
        return paths;
    }
    
    add(...pluginDiscoverers: ICanDiscoverPlugins[]) {
        this.pluginDiscoverers.push(...pluginDiscoverers);
    }

    discover() {
        this._hasDiscovered = true;
        this.pluginDiscoverers.forEach(_ => _.discover());
    }
}