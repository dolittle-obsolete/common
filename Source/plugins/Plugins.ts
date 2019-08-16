/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IPluginDiscoverers, IPluginLoader, IPlugins } from './index';

/**
 * Represents an implementation of {IPlugins}
 *
 * @export
 * @class Plugins
 */
export class Plugins implements IPlugins {
    /**
     * Instantiates an instance of {Plugins}.
     * @param {IPluginDiscoverers} _pluginDiscoverers
     * @param {IPluginLoader} _pluginLoader
     * @param {ILoggers} _logger
     */
    constructor(private _pluginDiscoverers: IPluginDiscoverers, private _pluginLoader: IPluginLoader, private _logger: ILoggers) {}

    async getPlugins() { 
        this._logger.info('Getting plugins');
        if (this._pluginLoader.needsReload) await this._pluginLoader.load();
        return this._pluginLoader.loaded; 
    }
    async getPluginPackages() { 
        this._logger.info('Getting plugin packages');
        if (this._pluginLoader.needsReload) await this._pluginLoader.load();
        return this._pluginLoader.pluginPackages;
    }

    discoverNewPlugins() {
        return this._pluginDiscoverers.discover();
    }
}
