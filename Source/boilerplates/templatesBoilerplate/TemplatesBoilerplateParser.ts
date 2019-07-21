/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyParsers } from "@dolittle/tooling.common.dependencies";
import { IFolders, IFileSystem, getFileDirPath, getFileNameAndExtension } from "@dolittle/tooling.common.files";
import { 
    TemplatesBoilerplate, ICanParseBoilerplates, Scripts, CannotParseBoilerplate, templatesBoilerplateContentDirectoryFromPath, ITemplate, 
    templateFromJson, templateConfigurationName, boilerplateIsTemplatesBoilerplate
} from "../index";

/**
 * Represents an implementation of {ICanParseBoilerplates} for parsing {ITemplatesBoilerplate} boilerplates
 *
 * @export
 * @class TemplatesBoilerplateParser
 */
export class TemplatesBoilerplateParser implements ICanParseBoilerplates {

    /**
     * Instantiates an instance of {TemplatesBoilerplateParser}.
     * @param {IDependencyParsers} _dependencyParsers
     * @param {IFolders} _folders
     * @param {IFileSystem} _fileSystem
     */
    constructor (private _dependencyParsers: IDependencyParsers, private _folders: IFolders, private _fileSystem: IFileSystem) {}
    
    canParse(boilerplate: any) {
        return boilerplateIsTemplatesBoilerplate(boilerplate);
    }
    
    async parse(boilerplate: any, boilerplatePath: string) {
        if (!this.canParse(boilerplate)) throw new CannotParseBoilerplate(boilerplatePath);
        let contentDirectory = templatesBoilerplateContentDirectoryFromPath(boilerplatePath);
        return new TemplatesBoilerplate(
            boilerplate.language || 'any',
            boilerplate.name,
            boilerplate.description,
            boilerplate.dependencies !== undefined? 
                Object.keys(boilerplate.dependencies).map(key => this._dependencyParsers.parse(boilerplate.dependencies[key], key))
                : [],
            boilerplate.namespace,
            Scripts.fromJson(boilerplate.scripts),
            contentDirectory,
            await this.createTemplates(contentDirectory)
        );
        
    }

    private async createTemplates(contentDirectory: string) {
        let templateFiles = await this._folders.getFilesRecursively(contentDirectory, new RegExp(templateConfigurationName));
        let templates: ITemplate[] = [];
        for (let templateFile of templateFiles) {
            let includedFiles = await this.getIncludedFiles(getFileDirPath(templateFile));
            let templateJson = await this._fileSystem.readJson(templateFile);
            let template = templateFromJson(templateJson, templateFile, includedFiles, this._dependencyParsers);
            templates.push(template);
        }
        return templates;
    }
    
    private async getIncludedFiles(folderPath: string) {
        return (await this._folders.getFiles(folderPath, /.*/)).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== templateConfigurationName);
    }
}