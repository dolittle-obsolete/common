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
    
    parse(boilerplate: any, boilerplatePath: string) {
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
            this.createTemplates(contentDirectory)
        );
        
    }

    private createTemplates(contentDirectory: string) {
        let templateFiles = this._folders.searchRecursive(contentDirectory, templateConfigurationName);
        let templates: ITemplate[] = [];
        templateFiles.forEach(_ => {
            let includedFiles = this.getIncludedFiles(getFileDirPath(_));
            let template = templateFromJson(JSON.parse(this._fileSystem.readFileSync(_).toString()), _, includedFiles, this._dependencyParsers);
            templates.push(template);
        });
        return templates;
    }
    
    private getIncludedFiles(folderPath: string) {
        return this._folders.searchFolderRegex(folderPath, /.*/).map(filePath => getFileNameAndExtension(filePath)).filter(file => file !== templateConfigurationName);
    }
}