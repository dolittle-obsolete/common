/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from 'winston';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { ArtifactsBoilerplate, ArtifactTemplate, CreatedArtifactTemplateDetails, IArtifactTemplates, IBoilerplates, WrongBoilerplateType } from '../index';
import { Folders, getFileNameAndExtension } from '@dolittle/tooling.common.utilities';

export const artifactsBoilerplateType = 'artifacts';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class ArtifactTemplates implements IArtifactTemplates {

    private _loadedBoilerplates: ArtifactsBoilerplate[];

    /**
     * Instantiates an instance of {ArtifactTemplatesManager}.
     * @param {IBoilerplates} _boilerplates
     * @param {Folders} _folders
     * @param {typeof FsExtra} _fileSystem
     * @param {typeof Handlebars} _handlebars
     * @param {Logger} logger
     */
    constructor(private _boilerplates: IBoilerplates, private _folders: Folders, private _fileSystem: typeof FsExtra, private _handlebars: typeof Handlebars, private _logger: Logger) {
        this._loadedBoilerplates = [];
    }

    get boilerplates() {
        this.loadAllBoilerplates();
        return this._loadedBoilerplates;
    }

    boilerplatesByLanguage(language: string, namespace?: string) {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        });
    }

    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): CreatedArtifactTemplateDetails {
        this._logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${artifactTemplate.boilerplate.language}' at destination ${destinationPath}`);
        
        this._folders.makeFolderIfNotExists(destinationPath);
        let filesToCreate = artifactTemplate.filesToCreate;
        
        filesToCreate.forEach( (filePath: string) => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = this._fileSystem.readFileSync(filePath, 'utf8');
            let segments: string[] = [];

            path.join(destinationPath, filename).split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this._handlebars.compile(oldContent);
            let newContent = template(context);
            this._fileSystem.writeFileSync(newFilePath, newContent);
        });

        return {artifactTemplate, boilerplate: artifactTemplate.boilerplate, destination: destinationPath};
    }

    private loadAllBoilerplates()  {
        this._loadedBoilerplates = this._boilerplates.byType(artifactsBoilerplateType).map(_ => {
            if (_ instanceof ArtifactsBoilerplate) return _;
            else throw new WrongBoilerplateType(`Expected boilerplate of type '${ArtifactsBoilerplate.name}' but got a '${_.constructor.name}'`)
        });
    }
}