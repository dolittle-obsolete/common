/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { FileSystem, Folders, getFileNameAndExtension } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { ITemplatesBoilerplate, ITemplate, CreatedTemplateDetails, ITemplatesBoilerplates, IBoilerplates, WrongBoilerplateType, Handlebars } from '../index';
import { templatesBoilerplateType } from './templatesBoilerplateType';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class TemplatesBoilerplates implements ITemplatesBoilerplates {

    private _loadedBoilerplates: ITemplatesBoilerplate[] = [];

    /**
     * Instantiates an instance of {ArtifactTemplatesManager}.
     * @param {IBoilerplates} _boilerplates
     * @param {Folders} _folders
     * @param {FileSystem} _fileSystem
     * @param {Handlebars} _handlebars
     * @param {Logger} _logger
     */
    constructor(private _boilerplates: IBoilerplates, private _folders: Folders, private _fileSystem: FileSystem, private _handlebars: Handlebars, private _logger: Logger) {}

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
    
    createTemplate(context: any, template: ITemplate, boilerplate: ITemplatesBoilerplate, destinationPath: string): CreatedTemplateDetails {
        this._logger.info(`Creating a template of type '${template.type}' and language '${boilerplate.language}' at destination ${destinationPath}`);
        
        this._folders.makeFolderIfNotExists(destinationPath);
        let filesToCreate = template.filesToCreate;
        
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

        return {template: template, boilerplate: boilerplate, destination: destinationPath};
    }

    private loadAllBoilerplates()  {
        this._loadedBoilerplates = this._boilerplates.byType(templatesBoilerplateType).map(_ => {
            if (_ instanceof TemplatesBoilerplate) return _;
            else throw new WrongBoilerplateType(`Expected boilerplate of type '${TemplatesBoilerplate.name}' but got a '${_.constructor.name}'`)
        });
    }
}