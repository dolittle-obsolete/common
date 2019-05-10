/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import * as FsExtra from 'fs-extra';

import { Logger } from 'winston';
import { Application } from "./Application";
import { Boilerplate } from "..//Boilerplate";
import { IApplicationsManager } from "./IApplicationsManager";
import { ICanManageBoilerplates } from "../ICanManageBoilerplates";
import { IBoilerplatesCreator } from '../IBoilerplatesCreator';
import { ExpectedBoilerplateError } from 'Source/ExpectedBoilerplateError';
import { CreatedApplicationDetails } from './CreatedApplicationDetails';

export const applicationBoilerplateType = 'application';
export const applicationFilename = 'application.json';
/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager implements IApplicationsManager {

    private _boilerplates: Boilerplate[];
    private _boilerplateManagers: ICanManageBoilerplates[];
    private _boilerplatesCreator: IBoilerplatesCreator;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;

    /**
     *Creates an instance of ApplicationsManager.
     * @param {ICanManageBoilerplates[]} boilerplateManagers
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @memberof ApplicationsManager
     */
    constructor(boilerplateManagers: ICanManageBoilerplates[], boilerplatesCreator: IBoilerplatesCreator, fileSystem: typeof FsExtra, logger: Logger) {
        this._boilerplateManagers = boilerplateManagers;
        this._boilerplatesCreator = boilerplatesCreator;
        this._fileSystem = fileSystem;
        this._logger = logger;
        this._boilerplates = [];

        this.loadAllBoilerplates();
        
    }
    get boilerplates(): Boilerplate[] {
        this.loadAllBoilerplates();
        return this._boilerplates;
    }
    get hasBoilerplate(): boolean {
        let boilerplates = this.boilerplates;
        return boilerplates && boilerplates.length > 0;
    }
    getApplicationFrom(folder: string): Application | null {
        if (! this.hasApplication(folder)) return null;
        const filePath = path.join(folder, applicationFilename);
        return Application.fromJson(JSON.parse(this._fileSystem.readFileSync(filePath, 'utf8')), filePath);
    }
    hasApplication(folder: string): boolean {
        const filePath = path.join(folder, applicationFilename);
        return this._fileSystem.existsSync(filePath);
    }

    boilerplatesByLanguage(language: string, namespace?: string): Boilerplate[] {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        })
    }
    createApplication(context: any, destinationPath: string, boilerplate: Boilerplate): CreatedApplicationDetails[] {
        let destination = destinationPath;
        this._logger.info(`Creating an application of language '${boilerplate.language}' at destination ${destinationPath}`);
        this._boilerplatesCreator.createBoilerplate(boilerplate, destination, context);
        return [{boilerplate, destination}];
    }

    private loadAllBoilerplates()  {
        this._boilerplateManagers.forEach(_ => {
            _.boilerplatesByType(applicationBoilerplateType).forEach(_ => {
                if (_ instanceof Boilerplate) this._boilerplates.push(_);
                else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${Boilerplate.name}' but got a '${_.constructor.name}'`)
            });
        });
    }
}