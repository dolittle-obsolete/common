/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanDiscoverPlugins, PluginPackage, IPluginDiscoverers } from "../internal";
import { ILoggers } from "@dolittle/tooling.common.logging";

/**
 * Represents an implementation of {IPluginDiscoverers}
 *
 * @export
 * @class PluginDiscoverers
 */
export class PluginDiscoverers implements IPluginDiscoverers {
    
    /**
     * Instantiates an instance of {PluginDiscoverers}.
     * @param {ICanDiscoverPlugins[]} pluginDiscoverers
     */
    constructor (private _pluginDiscoverers: ICanDiscoverPlugins[], private _loggers: ILoggers) {}

    get pluginDiscoverers() {
        return this._pluginDiscoverers;
    }
    
    get discovered() {
        let plugins: PluginPackage[] = [];
        this.pluginDiscoverers.forEach(_ => plugins.push(..._.discovered));
        return plugins;
    }
    
    get paths() {
        let paths: string[] = [];
        this.pluginDiscoverers.forEach(_ => paths.push(..._.pluginPaths));
        return paths;
    }
    
    add(...pluginDiscoverers: ICanDiscoverPlugins[]) {
        this._pluginDiscoverers.push(...pluginDiscoverers);
    }

    async discover(folder?: string) {
        this._loggers.info('Discovering plugins');
        await Promise.all(this.pluginDiscoverers.map(_ => _.discover(folder)));
        this._loggers.info('Finished discovering plugins');
    }
}
