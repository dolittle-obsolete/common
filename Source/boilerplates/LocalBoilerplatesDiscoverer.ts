/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {IFileSystem} from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ToolingPackage, packageIsCompatible, toolingPackage } from '@dolittle/tooling.common.packages';
import path from 'path';
import { IBoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplatesConfig, packageIsBoilerplatePackage } from './index';

/**
 * Represents an implementation of {ICanDiscoverBoilerplates} for discovering locally installed boilerplates
 */
export class LocalBoilerplatesDiscoverer implements ICanDiscoverBoilerplates {

    private _discovered: ToolingPackage[];
    private _boilerplatePaths: string[];

    /**
     * Initializes a new instance of {BoilerplatesDiscoverer}
     * @param {BoilerplatesConfig} _boilerplateConfig
     * @param {string} _toolingPackage
     * @param {string} _nodeModulesPath
     * @param {IBoilerplatesLoader} _boilerplatesLoader
     * @param {IFileSystem} _fileSystem
     * @param {ILoggers} _logger
     */
    constructor(private _boilerplatesConfig: BoilerplatesConfig, private _toolingPackage: any, private _nodeModulesPath: string, private _boilerplatesLoader: IBoilerplatesLoader, 
        private _fileSystem: IFileSystem, private _logger: ILoggers) {
        this._discovered = [];
        this._boilerplatePaths = [];
    }

    get boilerplatePaths() {return this._boilerplatePaths; }
    
    get discovered(): ToolingPackage[] {return this._discovered;}
    
    async discover() {
        this._boilerplatePaths = await this.getLocalPaths(this._nodeModulesPath);
        this._discovered = [];
        let boilerplatesConfigObject: any = {};

        for (let folderPath of this.boilerplatePaths) {
            let packageJson: ToolingPackage = await this._fileSystem.readJson(path.join(folderPath, 'package.json'));
            if (packageIsCompatible(packageJson, toolingPackage)) {
                if (boilerplatesConfigObject[packageJson.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${packageJson.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this._boilerplatesLoader.needsReload = true;
                boilerplatesConfigObject[packageJson.name] = folderPath;
                this._discovered.push(packageJson);
                
            }
        }
        if (this._boilerplatesLoader.needsReload) this._boilerplatesConfig.store = boilerplatesConfigObject;
    }

    private async getLocalPaths(rootDir: string) {
        let searchDirForBoilerplates = async (dirName: string, filePaths: string[], pluginPackagePaths: string[]) => {
            for (let filePath of filePaths) {
                let fileName = path.parse(filePath).name;
                if ((await this._fileSystem.lstat(filePath)).isFile()) {
                    filePath = path.normalize(filePath);
                    if (path.parse(filePath).base === 'package.json') {
                        let packageJson = await this._fileSystem.readJson(filePath);
                        if (packageIsBoilerplatePackage(packageJson)) {
                            let folderPath = path.parse(filePath).dir;
                            pluginPackagePaths.push(folderPath);
                        }
                    }
                }
                else if ((await this._fileSystem.lstat(filePath)).isDirectory() && dirName.startsWith('@')) {
                    let subDir = await this._fileSystem.readDirectory(filePath);
                    await searchDirForBoilerplates(fileName, subDir.map(_ => path.join(filePath, _)), pluginPackagePaths);   
                }
            }
        };
        let pluginPaths: string[] = [];
        let dirs = await this._fileSystem.readDirectory(rootDir);
        await Promise.all(dirs.map(async dir => {
            const dirPath = path.join(rootDir, dir);
            if ((await this._fileSystem.lstat(dirPath)).isDirectory()) {
                let subDir = await this._fileSystem.readDirectory(dirPath);
                return searchDirForBoilerplates(dir, subDir.map(_ => path.join(dirPath, _)), pluginPaths);
            }
        }));

        return pluginPaths.filter((v, i) => pluginPaths.indexOf(v) === i);
    }
}