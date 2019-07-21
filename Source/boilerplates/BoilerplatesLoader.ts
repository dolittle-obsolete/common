/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import { Boilerplate, IBoilerplatesLoader, BoilerplatesConfig, IBoilerplateParsers } from './index';


/**
 * Represents an implementation of {IBoilerplatesLoader} for loading boilerplates from the {BoilerplatesConfig}
 */
export class BoilerplatesLoader implements IBoilerplatesLoader {
    private _loadedBoilerplates!: Boilerplate[];

    /**
     * Instantiates an instance of {BoilerplatesLoader}
     * @param {IBoilerplateParsers} _boilerplateParsers
     * @param {BoilerplatesConfig} _boilerplatesConfig
     * @param {IFileSystem} _fileSystem
     * @param {ILoggers} _logger
     */
    constructor(private _boilerplateParsers: IBoilerplateParsers, private _boilerplatesConfig: BoilerplatesConfig, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        if (! this._fileSystem.existsSync(this._boilerplatesConfig.path)) {
            this._boilerplatesConfig.store = this._boilerplatesConfig.store;
        }
    }

    needsReload = true;
    
    get boilerplatesConfigurationPath() { return this._boilerplatesConfig.path; }
    
    get loaded() {
        return this._loadedBoilerplates;
    }

    async load() {
        this._loadedBoilerplates = [];
        let boilerplatesConfigObject: any = this._boilerplatesConfig.store;

        for (let key of Object.keys(boilerplatesConfigObject)) {
            let folderPath = path.resolve(boilerplatesConfigObject[key]);
            if (! (await this._fileSystem.exists(folderPath))) {
                this._logger.info(`Boilerplate path '${folderPath}' does not exist. Removing entry from boilerplates configuration`);
                delete boilerplatesConfigObject[key];
                this._boilerplatesConfig.store = boilerplatesConfigObject;
            }
            else this._loadedBoilerplates.push(await this.getFromFolder(folderPath));
        }
        this.needsReload = false;
        return this._loadedBoilerplates;
    }
    
    private async getFromFolder(folder: string) {
        let boilerplatePath = path.join(folder, 'boilerplate.json');
        
        if (! (await this._fileSystem.exists(boilerplatePath))) {
            this._logger.info(`The path of a boilerplate defined in the boilerplates configuration does not exists. Path: ${boilerplatePath}`);
            throw new Error(`Could not find boilerplate configuration in '${folder}'`);
        }

        let boilerplateObject = await this._fileSystem.readJson(boilerplatePath);

        return this._boilerplateParsers.parse(boilerplateObject, boilerplatePath);
    }
    
}