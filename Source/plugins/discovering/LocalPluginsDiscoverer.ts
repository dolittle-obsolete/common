/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ToolingPackage, packageIsCompatible } from '@dolittle/tooling.common.packages';
import path from 'path';
import { ICanDiscoverPlugins, PluginPackage, PluginsConfig, IPluginLoader, PluginAlreadyInUse, packageIsPluginPackage } from '../index';

/**
 * Represents an implementation of {ICanDiscoverPlugins} for discovering plugins under npm's global node_modules folder
 * 
 * @class LocalPluginsDiscoverer
 * @implements ICanDiscoverPlugins
 */
export class LocalPluginsDiscoverer implements ICanDiscoverPlugins {

    private _discoveredPlugins: PluginPackage[];
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
    constructor(private _toolingPackage: any, private _pluginsConfig: PluginsConfig, private _nodeModulesPath: string, private _pluginsLoader: IPluginLoader, 
        private _fileSystem: IFileSystem, private _logger: ILoggers) {
        this._discoveredPlugins = []; 
    }

    get pluginPaths() {
        return this._pluginPaths;
    }
    
    get discovered() {return this._discoveredPlugins;}
    
    async discover() {
        this._logger.info('Discovering plugins');
        this._pluginPaths = await this.discoverLocalPlugins(this._nodeModulesPath);
        this._discoveredPlugins = [];
        let pluginsConfigObject: any = {};

        for (let folderPath of this.pluginPaths) {
            let pluginJavascriptFiles = [
                path.join(folderPath, 'lib', 'index.js'),
                path.join(folderPath, 'dist', 'index.js'), 
                path.join(folderPath, 'index.js')
            ];
            let foundPlugin = false;
            for (let pluginPath of pluginJavascriptFiles) {
                if ((await this._fileSystem.exists(pluginPath))) {
                    foundPlugin = true;
                    let packageObject: ToolingPackage = await this._fileSystem.readJson(path.join(folderPath, 'package.json'));
                    if (packageIsCompatible(packageObject, this._toolingPackage)) {
                        if (pluginsConfigObject[packageObject.name]) {
                            this._logger.warn(`Discovered a plugin with an already in-use name '${packageObject.name}'.`);
                            throw new PluginAlreadyInUse(packageObject.name);
                        }
                        this._logger.info(`Discovered compatible plugin at '${folderPath}'`);
                        this._pluginsLoader.needsReload = true;

                        let pluginPackage = new PluginPackage(packageObject, pluginPath);
                        pluginsConfigObject[packageObject.name] = {pluginPath: pluginPackage.pluginFilePath, packagePath: folderPath};
                        this._discoveredPlugins.push(new PluginPackage(packageObject, pluginPath));
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

    private async discoverLocalPlugins(rootDir: string) {
        let searchDirForPlugins = async (dirName: string, filePaths: string[], pluginPackagePaths: string[]) => {
            for (let filePath of filePaths) {
                let fileName = path.parse(filePath).name;
                if ((await this._fileSystem.lstat(filePath)).isFile()) {
                    filePath = path.normalize(filePath);
                    if (path.parse(filePath).base === 'package.json') {
                        let packageJson = await this._fileSystem.readJson(filePath);
                        if (packageIsPluginPackage(packageJson)) {
                            let folderPath = path.parse(filePath).dir;
                            pluginPackagePaths.push(folderPath);
                        }
                    }
                }
                else if ((await this._fileSystem.lstat(filePath)).isDirectory() && dirName.startsWith('@')) {
                    let subDir = await this._fileSystem.readDirectory(filePath);
                    await searchDirForPlugins(fileName, subDir.map(_ => path.join(filePath, _)), pluginPackagePaths);   
                }
            }
        };
        let pluginPaths: string[] = [];
        let subDir = await this._fileSystem.readDirectory(rootDir);
        await Promise.all(subDir.map(async dir => {
            const dirPath = path.join(rootDir, dir);
            if ((await this._fileSystem.lstat(dirPath)).isDirectory()) {
                let subDir = await this._fileSystem.readDirectory(dirPath);
                return searchDirForPlugins(dir, subDir.map(_ => path.join(dirPath, _)), pluginPaths);
            }
        }));

        return pluginPaths.filter((v, i) => pluginPaths.indexOf(v) === i);
    }
}