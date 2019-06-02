/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application, applicationFilename } from '@dolittle/tooling.common.configurations';
import {FileSystem} from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { IBoilerplates, IApplicationsManager, ContentBoilerplate, CreatedApplicationDetails, WrongBoilerplateType } from '../index';

export const applicationBoilerplateType = 'application';

/**
 * Represents an implementation of {IApplicationsManager} for managing 
 *
 * @export
 * @class ArtifactsManager
 */
export class ApplicationsManager implements IApplicationsManager {
    private _loadedBoilerplates: ContentBoilerplate[];

    /**
     * Instantiates an instance of {ApplicationsManager}.
     * @param {IBoilerplateManagers} boilerplateManagers
     * @param {FileSystem} fileSystem
     * @param {Logger} logger
     */
    constructor(private _boilerplates: IBoilerplates, private _fileSystem: FileSystem, private _logger: Logger) {
        this._loadedBoilerplates = []
    }

    get boilerplates() {
        this.loadAllBoilerplates();
        return this._loadedBoilerplates;
    }

    getApplicationFrom(folder: string) {
        if (! this.hasApplication(folder)) return null;
        const filePath = path.join(folder, applicationFilename);
        return Application.fromJson(JSON.parse(this._fileSystem.readFileSync(filePath, 'utf8')), filePath);
    }

    hasApplication(folder: string) {
        const filePath = path.join(folder, applicationFilename);
        return this._fileSystem.existsSync(filePath);
    }

    boilerplatesByLanguage(language: string, namespace?: string) {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        });
    }

    create(context: any, destinationPath: string, boilerplate: ContentBoilerplate): CreatedApplicationDetails[] {
        let destination = destinationPath;
        this._logger.info(`Creating an application of language '${boilerplate.language}' at destination ${destinationPath}`);
        this._boilerplates.create(boilerplate, destination, context);
        return [{boilerplate, destination}];
    }

    private loadAllBoilerplates()  {
        this._loadedBoilerplates = this._boilerplates.byType(applicationBoilerplateType).map(_ => {
            if (_ instanceof ContentBoilerplate) return _;
            else throw new WrongBoilerplateType(`Expected boilerplate of type '${ContentBoilerplate.name}' but got a '${_.constructor.name}'`);
        });
    }
}