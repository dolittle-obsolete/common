/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { FileSystem, Folders, getFileNameAndExtension } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { ITemplatesBoilerplate, ITemplate, CreatedTemplateDetails, ITemplatesBoilerplates, IBoilerplates, Handlebars, boilerplateIsTemplatesBoilerplate } from '../index';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class TemplatesBoilerplates implements ITemplatesBoilerplates {

    private _loadedBoilerplates: ITemplatesBoilerplate[] = [];
    private _templates: ITemplate[] = [];
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
        this.reload();
        return this._loadedBoilerplates;
    }
    get templates() {
        this.reload();
        return this._templates;
    }

    byNamespace(namespace: string | undefined) {
        return this.boilerplates.filter(_ => {
            if (namespace && _.namespace) return _.namespace === namespace;
            return true;
        });
    }

    byLanguage(language: string, namespace?: string) {
        let boilerplates = this.byNamespace(namespace);
        return boilerplates.filter( _ => {
            return _.language && language; 
        });
    }

    byType(type: string, namespace?: string) {
        let boilerplates = this.byNamespace(namespace);
        return boilerplates.filter( _ => {
            return _.type && type; 
        });
    }
    byLanguageAndType(language: string, type: string, namespace?: string) {
        let boilerplates = this.byNamespace(namespace);
        return boilerplates.filter( _ => {
            return _.language === language && _.type === type; 
        });
    }

    templatesByType(templateType: string, namespace?: string) {
        return this.byNamespace(namespace)
                    .map(_ => _.templatesByType(templateType)).reduce((a, b) => a.concat(b), []);
    }
    
    create(context: any, template: ITemplate, boilerplate: ITemplatesBoilerplate, destinationPath: string): CreatedTemplateDetails {
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

    private reload()  {
        this._loadedBoilerplates = this._boilerplates.boilerplates.filter(boilerplateIsTemplatesBoilerplate);
        this._templates = this._loadedBoilerplates.map(_ => _.templates).reduce((a, b) => a.concat(b), []);
    }
}