/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import * as FsExtra from 'fs-extra';
import {Logger} from 'winston';
import semver from 'semver';
import { ICanDiscoverBoilerplates } from './ICanDiscoverBoilerplates';
import { nodeModulesPath, boilerplatesConfig } from './index';

import { IBoilerplatesLoader } from './IBoilerplatesLoader';
import { BoilerplatePackageJson } from './BoundedContextPackageJson';

const boilerplatesDiscoverer = require('@dolittle/boilerplates-discoverer');
const toolingPkg = require('../../package.json');
/**
 * Represents the manager of boiler plates
 */
export class BoilerplatesDiscoverer implements ICanDiscoverBoilerplates {
    private _discoveredBoilerplates: BoilerplatePackageJson[];
    private _boilerplatesLoader: IBoilerplatesLoader;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;
    /**
     * Initializes a new instance of {BoilerplatesDiscoverer}
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     */
    constructor(boilerplatesLoader: IBoilerplatesLoader, fileSystem: typeof FsExtra, logger: Logger) {
        this._boilerplatesLoader = boilerplatesLoader;
        this._fileSystem = fileSystem;
        this._logger = logger;
        this._discoveredBoilerplates = [];
        this.boilerplatePaths = boilerplatesDiscoverer.local(nodeModulesPath, [], 15);
    }

    /**
     * @inheritdoc
     *
     * @readonly
     * @type {string[]}
     * @memberof BoilerplatesDiscoverer
     */
    readonly boilerplatePaths: string[]
    /**
     * @inheritdoc
     *
     * @readonly
     * @type {BoilerplatePackageJson[]}
     * @memberof BoilerplatesDiscoverer
     */
    get discoveredBoilerplates(): BoilerplatePackageJson[] {return this._discoveredBoilerplates;}
    /**
     * @inheritdoc
     * @memberof BoilerplatesManager
     */
    discover() {
        this._discoveredBoilerplates = [];

        let boilerplatesConfigObject: any = {};

        this.boilerplatePaths.forEach(folderPath => {
            let packageJson: BoilerplatePackageJson = this._fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
            if (packageJson.dolittle.tooling === semver.major(toolingPkg.version).toString()) {
                if (boilerplatesConfigObject[packageJson.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${packageJson.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this._boilerplatesLoader.needsReload = true;
                boilerplatesConfigObject[packageJson.name] = folderPath;
                this._discoveredBoilerplates.push(packageJson);
                
            }
        });
        if (this._boilerplatesLoader.needsReload) boilerplatesConfig.store = boilerplatesConfigObject;
    }
}