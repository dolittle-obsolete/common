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
    private _pluginPaths!: string[];

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
        if (this._pluginPaths === undefined) this._pluginPaths = this.discoverLocalPlugins(this._nodeModulesPath);
        return this._pluginPaths;
    }
    
    get discovered() {return this._discoveredPlugins;}
    
    discover() {
        this._logger.info('Discovering plugins');
        this._pluginPaths = this.discoverLocalPlugins(this._nodeModulesPath);
        this._discoveredPlugins = [];
        let pluginsConfigObject: any = {};

        this.pluginPaths.forEach(folderPath => {
            let pluginJavascriptFiles = [
                path.join(folderPath, 'lib', 'index.js'),
                path.join(folderPath, 'dist', 'index.js'), 
                path.join(folderPath, 'index.js')
            ];
            let foundPlugin = false;
            pluginJavascriptFiles.forEach(pluginPath => {
                if (this._fileSystem.existsSync(pluginPath)) {
                    foundPlugin = true;
                    let packageObject: ToolingPackage = this._fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
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
            });

            if (!foundPlugin) {
                this._logger.warn(`Plugin package did not have well-known index.js file. Expected to be in one of the paths:
'${pluginJavascriptFiles.join('\n')}'`); 
            }
        });
        if (this._pluginsLoader.needsReload) this._pluginsConfig.store = pluginsConfigObject;
    }

    private discoverLocalPlugins(rootDir: string) {
        let searchDirForPlugins = (dirName: string, filePaths: string[], pluginPackagePaths: string[]) => {
            filePaths.forEach( filePath => {
                let fileName = path.parse(filePath).name;
                if (this._fileSystem.lstatSync(filePath).isFile()) {
                    filePath = path.normalize(filePath);
                    if (path.parse(filePath).base === 'package.json') {
                        let packageJson = this._fileSystem.readJsonSync(filePath);
                        if (packageIsPluginPackage(packageJson)) {
                            let folderPath = path.parse(filePath).dir;
                            pluginPackagePaths.push(folderPath);
                        }
                    }
                }
                else if (this._fileSystem.lstatSync(filePath).isDirectory() && dirName.startsWith('@')) {
                    searchDirForPlugins(fileName, this._fileSystem.readdirSync(filePath).map(_ => path.join(filePath, _)), pluginPackagePaths);   
                }
            });
        };
        let pluginPaths: string[] = [];
        this._fileSystem.readdirSync(rootDir).forEach(dir => {
            const dirPath = path.join(rootDir, dir);
            if (this._fileSystem.lstatSync(dirPath).isDirectory())
                searchDirForPlugins(dir, this._fileSystem.readdirSync(dirPath).map(_ => path.join(dirPath, _)), pluginPaths);
        });

        return pluginPaths.filter((v, i) => pluginPaths.indexOf(v) === i);
    }
}