/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application, applicationFilename } from '@dolittle/tooling.common.configurations';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { Logger } from 'winston';
import { IApplicationsManager, NonArtifactsBoilerplate, IBoilerplateManagers, IBoilerplatesCreator, CreatedApplicationDetails, ExpectedBoilerplateError } from '../internal';


export const applicationBoilerplateType = 'application';

/**
 * 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager implements IApplicationsManager {
    private _boilerplates: NonArtifactsBoilerplate[];
    /**
     *Creates an instance of ApplicationsManager.
     * @param {IBoilerplateManagers} boilerplateManagers
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
 
     */
    constructor(private _boilerplateManagers: IBoilerplateManagers, private _boilerplatesCreator: IBoilerplatesCreator, private _fileSystem: typeof FsExtra,
        private _logger: Logger) {
        this._boilerplates = []
        this.loadAllBoilerplates();
    }
    get boilerplates(): NonArtifactsBoilerplate[] {
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

    boilerplatesByLanguage(language: string, namespace?: string): NonArtifactsBoilerplate[] {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        });
    }
    createApplication(context: any, destinationPath: string, boilerplate: NonArtifactsBoilerplate): CreatedApplicationDetails[] {
        let destination = destinationPath;
        this._logger.info(`Creating an application of language '${boilerplate.language}' at destination ${destinationPath}`);
        this._boilerplatesCreator.createBoilerplate(boilerplate, destination, context);
        return [{boilerplate, destination}];
    }

    private loadAllBoilerplates()  {
        this._boilerplates = this._boilerplateManagers.boilerplatesByType(applicationBoilerplateType).map(_ => {
            if (_ instanceof NonArtifactsBoilerplate) return _;
            else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${NonArtifactsBoilerplate.name}' but got a '${_.constructor.name}'`);
        });
    }
}