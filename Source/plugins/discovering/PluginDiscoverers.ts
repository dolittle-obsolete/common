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
    constructor (private _pluginDiscoverers: ICanDiscoverPlugins[]) {}

    get pluginDiscoverers() {
        return this._pluginDiscoverers;
    }
    
    get discoveredPlugins() {
        let plugins: PluginPackage[] = [];
        this.pluginDiscoverers.forEach(_ => plugins.push(..._.discovered));
        return plugins;
    }
    
    get pluginPaths() {
        let paths: string[] = [];
        this.pluginDiscoverers.forEach(_ => paths.push(..._.pluginPaths));
        return paths;
    }
    
    add(...pluginDiscoverers: ICanDiscoverPlugins[]) {
        this._pluginDiscoverers.push(...pluginDiscoverers);
    }

    async discover() {
        this._hasDiscovered = true;
        await Promise.all(this.pluginDiscoverers.map(_ => _.discover()));
    }
}
