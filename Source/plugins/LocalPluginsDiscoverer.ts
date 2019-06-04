/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as FsExtra from 'fs-extra';
import path from 'path';
import semver from 'semver';
import { Logger } from 'winston';
import { ICanDiscoverPlugins } from './ICanDiscoverPlugins';
import { PluginPackage, PluginPackageJson } from './PluginPackage';
import { PluginsConfig } from 'configurations';
import { IPluginLoader } from './IPluginLoader';

const toolingPkg = require('../package.json');

const dolittlePluginKeywords = ['dolittle', 'tooling', 'plugin'];

/**
 * Represents a system for discovering locally installed tooling plugins
 */
export class LocalPluginsDiscoverer implements ICanDiscoverPlugins {
    private _discoveredPlugins: PluginPackage[];
    private _pluginPaths!: string[];
    /**
     * Initializes a new instance of {LocalPluginsDiscoverer}
     * @param {PluginsConfig} boilerplateConfig
     * @param {string} nodeModulesPath
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     */
    constructor(private _pluginsConfig: PluginsConfig, private _nodeModulesPath: string, private _pluginsLoader: IPluginLoader, 
        private _fileSystem: typeof FsExtra, private _logger: Logger) {
        this._discoveredPlugins = []; 
    }

    get pluginPaths() {
        if (this._pluginPaths === undefined) this._pluginPaths = this.discoverLocalPlugins(this._nodeModulesPath);
        return this._pluginPaths;
    }
    
    get discoveredPlugins() {return this._discoveredPlugins;}
    /**
     * @inheritdoc
     * @memberof BoilerplatesManager
     */
    discover() {
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
                    let packageJson: PluginPackageJson = this._fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
                    if (packageJson.dolittle.tooling === semver.major(toolingPkg.version).toString()) {
                        if (pluginsConfigObject[packageJson.name]) {
                            this._logger.warn(`Discovered a plugin with an already in-use name '${packageJson.name}'.`);
                            throw new Error(`Found two plugins with the same package name targeting the same tooling version.`);
                        }
                        this._pluginsLoader.needsReload = true;
                        pluginsConfigObject[packageJson.name] = folderPath;
                        this._discoveredPlugins.push(new PluginPackage(packageJson, pluginPath));
                    }
                };   
            });

            if (!foundPlugin) {
                this._logger.info(`Plugin package did not have well-known index.js file. Expected to be in one of the paths:
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
                        if (this.packageIsDolittlePlugin(packageJson)) {
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

    private packageIsDolittlePlugin(packageJson: any) {
        return packageJson.keywords && dolittlePluginKeywords.every(val => packageJson.keywords.includes(val));
    }
}