/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IFileSystem, IFolders, getFileNameAndExtension } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import { ITemplatesBoilerplate, ITemplate, CreatedTemplateDetails, ITemplatesBoilerplates, Handlebars, boilerplateIsTemplatesBoilerplate, Boilerplates, IBoilerplatesLoader } from '../internal';

/**
 * Represents an implementation of {ITemplatesBoilerplates}
 *
 * @export
 * @class TemplatesBoilerplates
 */
export class TemplatesBoilerplates extends Boilerplates implements ITemplatesBoilerplates {

    /**
     * Instantiates an instance of {TemplatesBoilerplates}.
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @param {IFolders} _folders
     * @param {IFileSystem} _fileSystem
     * @param {Handlebars} _handlebars
     * @param {ILoggers} _logger
     */
    constructor(boilerplatesLoader: IBoilerplatesLoader, private _folders: IFolders, private _fileSystem: IFileSystem, private _handlebars: Handlebars, private _logger: ILoggers) {
        super(boilerplatesLoader);
    }

    get boilerplates() {
        return super.boilerplates.filter(boilerplateIsTemplatesBoilerplate);
    }

    get templates() {
        return this.boilerplates.map(_ => _.templates).reduce((a, b) => a.concat(b), []);
    }
    
    byNamespace(namespace: string | undefined) {
        return super.byNamespace(namespace) as ITemplatesBoilerplate[];
    }

    byLanguage(language: string, namespace?: string) {
        return super.byLanguage(language, namespace) as ITemplatesBoilerplate[];
    }

    byType(type: string, namespace?: string) {
        return super.byType(type, namespace) as ITemplatesBoilerplate[];
    }

    byLanguageAndType(language: string, type: string, namespace?: string)  {
        return super.byLanguageAndType(language, type, namespace) as ITemplatesBoilerplate[];
    }


    templatesByType(templateType: string, namespace?: string) {
        return this.byNamespace(namespace)
                    .map((_: any) => (_ as ITemplatesBoilerplate).templatesByType(templateType)).reduce((a, b) => a.concat(b), []);
    }
    
    async create(context: any, template: ITemplate, boilerplate: ITemplatesBoilerplate, destinationPath: string): Promise<CreatedTemplateDetails> {
        this._logger.info(`Creating a template of type '${template.type}' and language '${boilerplate.language}' at destination ${destinationPath}`);
        
        await this._folders.makeFolderIfNotExists(destinationPath);
        let filesToCreate = template.filesToCreate;
        
        await Promise.all(filesToCreate.map(async filePath => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = await this._fileSystem.readFile(filePath);
            let segments: string[] = [];

            path.join(destinationPath, filename).split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this._handlebars.compile(oldContent);
            let newContent = template(context);
            await this._fileSystem.writeFile(newFilePath, newContent);
        }));

        return {template: template, boilerplate: boilerplate, destination: destinationPath};
    }
}