/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyParsers } from "@dolittle/tooling.common.dependencies";
import { Folders, FileSystem, getFileDirPath, getFileNameAndExtension } from "@dolittle/tooling.common.Files";
import { 
    TemplatesBoilerplate, ICanParseBoilerplates, Scripts, CannotParseBoilerplate, templatesBoilerplateContentDirectoryFromPath, ITemplate, 
    templateFromJson, templateConfigurationName, boilerplateIsTemplatesBoilerplate, ITemplatesBoilerplate
} from "../index";

/**
 * Represents an implementation of {ICanParseBoilerplates} for parsing {IArtifactsBoilerplate} boilerplates
 *
 * @export
 * @class TemplatesBoilerplateParser
 */
export class TemplatesBoilerplateParser implements ICanParseBoilerplates {

    /**
     * Instantiates an instance of {TemplatesBoilerplateParser}.
     * @param {IDependencyParsers} _dependencyParsers
     * @param {Folders} _folders
     * @param {FileSystem} _fileSystem
     */
    constructor (private _dependencyParsers: IDependencyParsers, private _folders: Folders, private _fileSystem: FileSystem) {}
    
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