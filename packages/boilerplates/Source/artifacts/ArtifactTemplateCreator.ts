/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import * as FsExtra from 'fs-extra';
import {Logger} from 'winston';
import * as Handlebars from 'handlebars';

import { getFileNameAndExtension } from '@dolittle/tooling.common.utilities/helpers';
import { Folders } from '@dolittle/tooling.common.utilities';
import { ArtifactTemplate } from './ArtifactTemplate';
import { IArtifactTemplateCreator } from './IArtifactTemplateCreator';

/**
 * Represents the manager of boiler plates
 */
export class ArtifactTemplateCreator implements IArtifactTemplateCreator {
    private _folders: Folders;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;
    private _handlebars: typeof Handlebars;

    /**
     * Initializes a new instance of {BoilerplatesManager}
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @param {typeof Handlebars} handlebars
     */
    constructor(folders: Folders, fileSystem: typeof FsExtra, logger: Logger, handlebars: typeof Handlebars) {
        this._folders = folders;
        this._fileSystem = fileSystem;
        this._handlebars = handlebars;
        this._logger = logger;
    }
    /**
     * Create an instance of {Boilerplate} of an artifact into a specific destination folder with a given context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destination 
     * @param {any} context 
     */
    createArtifactBoilerplate(artifactTemplate: ArtifactTemplate, destination: string, context: any) {
        this._logger.info(`Creating artifact template '${artifactTemplate.name}'`)
        this._folders.makeFolderIfNotExists(destination);
        let filesToCreate = artifactTemplate.filesToCreate;
        
        filesToCreate.forEach( (filePath: string) => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = this._fileSystem.readFileSync(filePath, 'utf8');
            let segments: string[] = [];

            path.join(destination, filename).split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this._handlebars.compile(oldContent);
            let newContent = template(context);
            this._fileSystem.writeFileSync(newFilePath, newContent);
        });
    }
    
}