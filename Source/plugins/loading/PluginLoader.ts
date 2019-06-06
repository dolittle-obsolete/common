/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {FileSystem} from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { PluginsConfig, IPlugin, IPluginLoader, PluginModule } from "../index";
import { ToolingPackage } from '@dolittle/tooling.common.packages';

/**
 * Represents an implementation of {IPluginLoader}
 *
 * @export
 * @class PluginLoader
 * @implements {IPluginLoader}
 */
export class PluginLoader implements IPluginLoader {
    private _loadedPlugins!: IPlugin[];
    private _loadedPluginPackages!: ToolingPackage[];
    /**
     * Instantiates an instance of {PluginLoader}.
     * @param {PluginsConfig} _pluginsConfig
     * @param {FileSystem} _fileSystem
     * @param {Logger} _logger
     */
    constructor(private _pluginsConfig: PluginsConfig, private _fileSystem: FileSystem, private _logger: Logger) {
        if (! this._fileSystem.existsSync(this._pluginsConfig.path))
            this._pluginsConfig.store = this._pluginsConfig.store;
    }
    needsReload = true;

    get pluginsConfigurationPath() { return this._pluginsConfig.path; }

    async getPluginPackages() { 
        if (! this._loadedPluginPackages || this.needsReload) await this.load();
        return this._loadedPluginPackages;
    }

    async getLoaded() {
        if (! this._loadedPlugins || this.needsReload) return (await this.load());
        return this._loadedPlugins;
    }

    async load() {
        this._logger.info('Loading plugins');
        this._loadedPlugins = [];
        this._loadedPluginPackages = [];

        let pluginsConfigObject: any = this._pluginsConfig.store;

        for (let key of Object.keys(pluginsConfigObject)) {
            let pluginFilePath = path.resolve(pluginsConfigObject[key].pluginPath);
            let pluginPackagePath = path.join(path.resolve(pluginsConfigObject[key].packagePath), 'package.json');

            if (!this._fileSystem.existsSync(pluginFilePath)) {
                this._logger.info(`Plugin path '${pluginFilePath}' does not exist. Removing entry from plugins configuration`);
                delete pluginsConfigObject[key];
                this._pluginsConfig.store = pluginsConfigObject;
            }
            else {
                let plugin = await this.getPluginFromModule(pluginFilePath);
                this._loadedPlugins.push(plugin);
                let pluginPackage = await this._fileSystem.readJson(pluginPackagePath);
                this._loadedPluginPackages.push(pluginPackage as ToolingPackage)
            }
        }
        this.needsReload = false;
        return this._loadedPlugins;
    }
    
    private async getPluginFromModule(pluginFilePath: string) {
        let pluginModule: PluginModule = await import(pluginFilePath);
        return pluginModule.plugin;
    }    
}