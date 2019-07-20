/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { FileSystem } from '@dolittle/tooling.common.files';
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
     * @param {FileSystem} _fileSystem
     * @param {ILoggers} _logger
     */
    constructor(private _boilerplateParsers: IBoilerplateParsers, private _boilerplatesConfig: BoilerplatesConfig, private _fileSystem: FileSystem, private _logger: ILoggers) {
        if (! this._fileSystem.existsSync(this._boilerplatesConfig.path)) {
            this._boilerplatesConfig.store = this._boilerplatesConfig.store;
        }
    }

    needsReload = true;
    
    get boilerplatesConfigurationPath() { return this._boilerplatesConfig.path; }
    
    get loaded() {
        if (!this._loadedBoilerplates || this.needsReload) return this.load();
        return this._loadedBoilerplates;
    }

    load() {
        this._loadedBoilerplates = [];
        let boilerplatesConfigObject: any = this._boilerplatesConfig.store;

        Object.keys(boilerplatesConfigObject).forEach(key => {
            let folderPath = path.resolve(boilerplatesConfigObject[key]);
            if (!this._fileSystem.existsSync(folderPath)) {
                this._logger.info(`Boilerplate path '${folderPath}' does not exist. Removing entry from boilerplates configuration`);
                delete boilerplatesConfigObject[key];
                this._boilerplatesConfig.store = boilerplatesConfigObject;
            }
            else this._loadedBoilerplates.push(this.getFromFolder(folderPath));
        });
        this.needsReload = false;
        return this._loadedBoilerplates;
    }
    
    private getFromFolder(folder: string) {
        let boilerplatePath = path.join(folder, 'boilerplate.json');
        
        if (!this._fileSystem.existsSync(boilerplatePath)) {
            this._logger.info(`The path of a boilerplate defined in the boilerplates configuration does not exists. Path: ${boilerplatePath}`);
            throw new Error(`Could not find boilerplate configuration in '${folder}'`);
        }

        let boilerplateObject = JSON.parse(this._fileSystem.readFileSync(boilerplatePath, 'utf8'));

        return this._boilerplateParsers.parse(boilerplateObject, boilerplatePath);
    }
    
}