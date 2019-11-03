/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { packageIsCompatible, ILocalPackageDiscoverers } from '@dolittle/tooling.common.packages';
import path from 'path';
import { ICanDiscoverPlugins, PluginPackage, PluginsConfig, IPluginLoader, PluginAlreadyInUse, packageIsPluginPackage, PluginConfigObject } from '../internal';
import { IFileSystem } from '@dolittle/tooling.common.files';

/**
 * Represents an implementation of {ICanDiscoverPlugins} for discovering plugins under npm's global node_modules folder
 * 
 * @class LocalPluginsDiscoverer
 * @implements ICanDiscoverPlugins
 */
export class LocalPluginsDiscoverer implements ICanDiscoverPlugins {

    private _discoveredPlugins: PluginPackage[] = [];
    private _pluginPaths: string[] = [];

    /**
     * Instantiates an instance of {LocalPluginsDiscoverer}
     * @param {*} _toolingPackage
     * @param {PluginsConfig} _pluginsConfig
     * @param {string} _nodeModulesPath
     * @param {IsLoader} _pluginsLoader
     * @param {typeof FsExtra} _fileSystem
     * @param {ILoggers} _logger
     */
    constructor(private _toolingPackage: any, private _pluginsConfig: PluginsConfig, private _pluginsLoader: IPluginLoader, 
        private _localPackageDiscoverers: ILocalPackageDiscoverers, private _fileSystem: IFileSystem, private _logger: ILoggers) {}

    get pluginPaths() {
        return this._pluginPaths;
    }
    
    get discovered() {
        return this._discoveredPlugins;
    }
    
    async discover(folder?: string) {
        this._discoveredPlugins = [];
        this._pluginPaths = [];
        let discoveredPluginPackages = await this._localPackageDiscoverers.discover(folder, _ => packageIsPluginPackage(_));
        
        let pluginsConfigObject: {[pluginPackageName: string]: PluginConfigObject} = {};

        for (let discoveredPlugin of discoveredPluginPackages) {
            let folderPath = discoveredPlugin.path;
            let toolingPackage = discoveredPlugin.package;
            let pluginJavascriptFiles = [
                path.join(folderPath, 'Distribution', 'index.js'),
            ];
            let foundPlugin = false;
            for (let pluginPath of pluginJavascriptFiles) {
                if ((await this._fileSystem.exists(pluginPath))) {
                    foundPlugin = true;
                    if (packageIsCompatible(toolingPackage, this._toolingPackage)) {
                        if (pluginsConfigObject[toolingPackage.name]) {
                            this._logger.warn(`Discovered a plugin with an already in-use name '${toolingPackage.name}'.`);
                            throw new PluginAlreadyInUse(toolingPackage.name);
                        }
                        this._logger.info(`Discovered compatible plugin at '${folderPath}'`);
                        this._pluginsLoader.needsReload = true;
                        
                        let pluginPackage = new PluginPackage(toolingPackage, pluginPath);
                        pluginsConfigObject[toolingPackage.name] = {pluginPath: pluginPackage.pluginFilePath, packagePath: folderPath};
                        this._discoveredPlugins.push(pluginPackage);
                        this._pluginPaths.push(folderPath);
                    }
                };   
            }

            if (!foundPlugin) {
                this._logger.warn(`Plugin package did not have well-known index.js file. Expected to be in one of the paths:
'${pluginJavascriptFiles.join('\n')}'`); 
            }
        }
        if (this._pluginsLoader.needsReload) this._pluginsConfig.store = pluginsConfigObject;
    }
}
