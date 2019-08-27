/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {IFileSystem} from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import { PluginsConfig, IPlugin, IPluginLoader, PluginModule, PluginPackage } from "../index";

/**
 * Represents an implementation of {IPluginLoader}
 *
 * @export
 * @class PluginLoader
 * @implements {IPluginLoader}
 */
export class PluginLoader implements IPluginLoader {
    private _loadedPlugins: IPlugin[] = [];
    private _loadedPluginPackages: PluginPackage[] = [];

    /**
     * Instantiates an instance of {PluginLoader}.
     * @param {PluginsConfig} _pluginsConfig
     * @param {IFileSystem} _fileSystem
     * @param {ILoggers} _logger
     */
    constructor(private _pluginsConfig: PluginsConfig, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        if (! this._fileSystem.existsSync(this._pluginsConfig.path))
            this._pluginsConfig.store = this._pluginsConfig.store;
    }
    
    needsReload = true;

    get pluginsConfigurationPath() { 
        return this._pluginsConfig.path;
    }

    get pluginPackages() { 
        return this._loadedPluginPackages;
    }

    get loaded() {
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

            if (! (await this._fileSystem.exists(pluginFilePath))) {
                this._logger.warn(`Plugin path '${pluginFilePath}' does not exist. Removing entry from plugins configuration`);
                delete pluginsConfigObject[key];
                this._pluginsConfig.store = pluginsConfigObject;
            }
            else {
                let plugin = await this.getPluginFromModule(pluginFilePath);
                if (plugin) {
                    this._loadedPlugins.push(plugin);
                    let pluginPackageObj = await this._fileSystem.readJson(pluginPackagePath);
                    let pluginPackage: PluginPackage = {
                        packageJson: pluginPackageObj,
                        pluginFilePath: pluginFilePath
                    }
                    this._loadedPluginPackages.push(pluginPackage)
                }
            }
        }
        this.needsReload = false;
        return this._loadedPlugins;
    }
    
    private async getPluginFromModule(pluginFilePath: string) {
        let pluginModule: PluginModule | undefined;
        try {
            let stats = await this._fileSystem.stat(pluginFilePath);
            if (stats.isSymbolicLink()) 
                pluginFilePath = await this._fileSystem.realPath(pluginFilePath)
            
            pluginModule = await import(pluginFilePath);
            return pluginModule!.plugin;
        } catch(error) {
            this._logger.info(`Could not load plugin from path ${pluginFilePath}`);
            this._logger.error(error);
        }
        return undefined;
    }    
}
