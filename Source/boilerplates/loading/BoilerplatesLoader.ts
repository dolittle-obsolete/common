/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import { IBoilerplatesLoader, BoilerplatesConfig, IBoilerplateParsers, IBoilerplate } from '../internal';


/**
 * Represents an implementation of {IBoilerplatesLoader} for loading boilerplates from the {BoilerplatesConfig}
 */
export class BoilerplatesLoader implements IBoilerplatesLoader {
    private _loadedBoilerplates: IBoilerplate[] = [];

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

    get boilerplatesConfigurationPath() {
        return this._boilerplatesConfig.path;
    }

    get loaded() {
        return this._loadedBoilerplates;
    }

    async load() {
        this._logger.info('Loading boilerplates');
        this._loadedBoilerplates = [];
        const boilerplatesConfigObject: any = this._boilerplatesConfig.store;

        for (const key of Object.keys(boilerplatesConfigObject)) {
            const folderPath = path.resolve(boilerplatesConfigObject[key]);
            if (! (await this._fileSystem.exists(folderPath))) {
                this._logger.warn(`Boilerplate path '${folderPath}' does not exist. Removing entry from boilerplates configuration`);
                delete boilerplatesConfigObject[key];
                this._boilerplatesConfig.store = boilerplatesConfigObject;
            }
            else this._loadedBoilerplates.push(await this.getFromFolder(folderPath));
        }
        this.needsReload = false;

        this._logger.info('Finished loading boilerplates');
        return this._loadedBoilerplates;
    }

    private async getFromFolder(folder: string) {
        const boilerplatePath = path.join(folder, 'boilerplate.json');
        const boilerplateExists = await this._fileSystem.exists(boilerplatePath);
        if (! boilerplateExists) {
            this._logger.info(`The path of a boilerplate defined in the boilerplates configuration does not exists. Path: ${boilerplatePath}`);
            throw new Error(`Could not find boilerplate configuration in '${folder}'`);
        }

        const boilerplateObject = await this._fileSystem.readJson(boilerplatePath);

        return this._boilerplateParsers.parse(boilerplateObject, boilerplatePath);
    }

}
