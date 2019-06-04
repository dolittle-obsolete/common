/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as FsExtra from 'fs-extra';
import path from 'path';
import { Logger } from 'winston';
import { PluginsConfig } from "./configurations";
import { IPlugin } from './IPlugin';
import { IPluginLoader } from './IPluginLoader';
import { PluginModule } from './PluginModule';

export class PluginLoader implements IPluginLoader {
    private _loadedPlugins!: IPlugin[];

    constructor(private _pluginsConfig: PluginsConfig, private _fileSystem: typeof FsExtra, private _logger: Logger) {
        if (! this._fileSystem.existsSync(this._pluginsConfig.path))
            this._pluginsConfig.store = this._pluginsConfig.store;
    }
    needsReload = true;
    get pluginsPath() { return this._pluginsConfig.path; }
    async getLoadedPlugins() {
        if (! this._loadedPlugins || this.needsReload) return (await this.load());
        return this._loadedPlugins;
    }

    async load() {
        this._loadedPlugins = [];
        let pluginsConfigObject: any = this._pluginsConfig.store;

        for (let key of Object.keys(pluginsConfigObject)) {
            let modulePath = path.resolve(pluginsConfigObject[key]);
            if (!this._fileSystem.existsSync(modulePath)) {
                this._logger.info(`Plugin path '${modulePath}' does not exist. Removing entry from plugins configuration`);
                delete pluginsConfigObject[key];
                this._pluginsConfig.store = pluginsConfigObject;
            }
            else {
                let plugin = await this.getPluginFromModule(modulePath);
                this._loadedPlugins.push(plugin);
            }
        }
        this.needsReload = false;
        return this._loadedPlugins;
    }
    
    private async getPluginFromModule(modulePath: string) {
        let pluginModule: PluginModule = await import(path.join(modulePath, 'index'));
        return <IPlugin>pluginModule.plugin;
    }
    
    
}