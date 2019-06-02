/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { FileSystem, Folders, getFileNameAndExtension } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { ITemplatesBoilerplate, ITemplate, CreatedTemplateDetails, ITemplatesBoilerplates, IBoilerplates, Handlebars, boilerplateIsTemplatesBoilerplate, Boilerplates, IBoilerplatesLoader } from '../index';

/**
 * Manages the artifacts
 *
 * @export
 * @class ArtifactsManager
 */
export class TemplatesBoilerplates extends Boilerplates implements ITemplatesBoilerplates {

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
    constructor(boilerplatesLoader: IBoilerplatesLoader, private _folders: Folders, private _fileSystem: FileSystem, private _handlebars: Handlebars, private _logger: Logger) {
        super(boilerplatesLoader);
    }

    get boilerplates() {
        return super.boilerplates.filter(boilerplateIsTemplatesBoilerplate);
    }
    get templates() {
        return this.boilerplates.map(_ => _.templates).reduce((a, b) => a.concat(b), []);
    }


    templatesByType(templateType: string, namespace?: string) {
        return this.byNamespace(namespace)
                    .map((_: any) => (_ as ITemplatesBoilerplate).templatesByType(templateType)).reduce((a, b) => a.concat(b), []);
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
}