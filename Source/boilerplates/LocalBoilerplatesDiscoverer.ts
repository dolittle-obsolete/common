/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as FsExtra from 'fs-extra';
import path from 'path';
import semver from 'semver';
import { Logger } from 'winston';
import { BoilerplatePackage, IBoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplatesConfig, packageIsBoilerplate } from './index';

const toolingPkg = require('../package.json');

/**
 * Represents an implementation of {ICanDiscoverBoilerplates} for discovering locally installed boilerplates
 */
export class LocalBoilerplatesDiscoverer implements ICanDiscoverBoilerplates {

    private _discovered: BoilerplatePackage[];
    private _boilerplatePaths: string[];

    /**
     * Initializes a new instance of {BoilerplatesDiscoverer}
     * @param {BoilerplatesConfig} boilerplateConfig
     * @param {string} nodeModulesPath
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     */
    constructor(private _boilerplatesConfig: BoilerplatesConfig, private _nodeModulesPath: string, private _boilerplatesLoader: IBoilerplatesLoader, 
        private _fileSystem: typeof FsExtra, private _logger: Logger) {
        this._discovered = [];
        this._boilerplatePaths = [];
    }

    get boilerplatePaths() {return this._boilerplatePaths; }
    
    get discovered(): BoilerplatePackage[] {return this._discovered;}
    
    discover() {
        this._boilerplatePaths = this.getLocalPaths(this._nodeModulesPath);
        this._discovered = [];
        let boilerplatesConfigObject: any = {};

        this.boilerplatePaths.forEach(folderPath => {
            let packageJson: BoilerplatePackage = this._fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
            if (packageJson.dolittle.tooling === semver.major(toolingPkg.version).toString()) {
                if (boilerplatesConfigObject[packageJson.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${packageJson.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this._boilerplatesLoader.needsReload = true;
                boilerplatesConfigObject[packageJson.name] = folderPath;
                this._discovered.push(packageJson);
                
            }
        });
        if (this._boilerplatesLoader.needsReload) this._boilerplatesConfig.store = boilerplatesConfigObject;
    }

    private getLocalPaths(rootDir: string) {
        let searchDirForBoilerplates = (dirName: string, filePaths: string[], pluginPackagePaths: string[]) => {
            filePaths.forEach( filePath => {
                let fileName = path.parse(filePath).name;
                if (this._fileSystem.lstatSync(filePath).isFile()) {
                    filePath = path.normalize(filePath);
                    if (path.parse(filePath).base === 'package.json') {
                        let packageJson = this._fileSystem.readJsonSync(filePath);
                        if (packageIsBoilerplate(packageJson)) {
                            let folderPath = path.parse(filePath).dir;
                            pluginPackagePaths.push(folderPath);
                        }
                    }
                }
                else if (this._fileSystem.lstatSync(filePath).isDirectory() && dirName.startsWith('@')) {
                    searchDirForBoilerplates(fileName, this._fileSystem.readdirSync(filePath).map(_ => path.join(filePath, _)), pluginPackagePaths);   
                }
            });
        };
        let pluginPaths: string[] = [];
        this._fileSystem.readdirSync(rootDir).forEach(dir => {
            const dirPath = path.join(rootDir, dir);
            if (this._fileSystem.lstatSync(dirPath).isDirectory())
                searchDirForBoilerplates(dir, this._fileSystem.readdirSync(dirPath).map(_ => path.join(dirPath, _)), pluginPaths);
        });

        return pluginPaths.filter((v, i) => pluginPaths.indexOf(v) === i);
    }
}