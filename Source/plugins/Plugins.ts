/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IPlugin, IPluginDiscoverers, IPluginLoader, IPlugins } from './index';

/**
 * Represents an implementation of {IPlugins}
 *
 * @export
 * @class Plugins
 */
export class Plugins implements IPlugins {
    private _plugins: IPlugin[] = [];

    /**
     * Instantiates an instance of {Plugins}.
     * @param {IPluginDiscoverers} _pluginDiscoverers
     * @param {IPluginLoader} _pluginLoader
     * @param {ILoggers} _logger
     */
    constructor(private _pluginDiscoverers: IPluginDiscoverers, private _pluginLoader: IPluginLoader, private _logger: ILoggers) {}

    async getPlugins() { 
        this._logger.info('Getting plugins');
        await this.loadPlugins();
        return this._plugins; 
    }
    async getPluginPackages() { 
        this._logger.info('Getting plugin packages');
        let pluginPackages = await this._pluginLoader.getPluginPackages();
        return pluginPackages; 
    }

    discoverNewPlugins() {
        this._pluginDiscoverers.discover();
    }

    private async loadPlugins() {
        this._plugins = await this._pluginLoader.getLoaded();
    }
}