/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyParsers } from "@dolittle/tooling.common.dependencies";
import { Folders, FileSystem } from "@dolittle/tooling.common.files";
import path from 'path';
import { ICanParseBoilerplates, Scripts, ContentBoilerplate, contentBoilerplateContentDirectoryName, CannotParseBoilerplate, boilerplateIsContentBoilerplate, contentBoilerplateContentDirectoryFromPath } from "../index";

const binaryFiles = [
    '.jpg',
    '.png',
    '.obj',
    '.dll',
    '.bin',
    '.exe',
    '.ttf'
];
/**
 * Represents an implementation of {ICanParseBoilerplates} for parsing {ContentBoilerplate} boilerplates
 *
 * @export
 * @class NonArtifactsBoilerplateParser
 */
export class ContentBoilerplateParser implements ICanParseBoilerplates {

    /**
     * Instantiates an instance of {ContentBoilerplateParser}.
     * @param {IDependencyParsers} _dependencyParsers
     * @param {Folders} _folders
     * @param {FileSystem} _fileSystem
     */
    constructor (private _dependencyParsers: IDependencyParsers, private _folders: Folders, private _fileSystem: FileSystem) {}
    
    canParse(boilerplate: any) {
        return boilerplateIsContentBoilerplate(boilerplate);
    }
    
    parse(boilerplate: any, boilerplatePath: string) {
        if (!this.canParse(boilerplate)) throw new CannotParseBoilerplate(boilerplatePath);
        let bindings = this.getBindingsFor(boilerplatePath);
        return new ContentBoilerplate(
            boilerplate.language || 'any',
            boilerplate.name,
            boilerplate.description,
            boilerplate.type,
            boilerplate.dependencies !== undefined? 
                Object.keys(boilerplate.dependencies).map(key => this._dependencyParsers.parse(boilerplate.dependencies[key], key))
                : [],
                boilerplate.namespace,
            Scripts.fromJson(boilerplate.scripts),
            boilerplate.target,
            boilerplate.framework,
            boilerplate.parent,
            contentBoilerplateContentDirectoryFromPath(boilerplatePath),
            bindings.pathsNeedingBinding,
            bindings.filesNeedingBinding
        );
    }

    /**
     * Gets the path and file bindings for a boilerplate
     * 
     * @param {string} boilerplatePath The path to the boilerplate.json file
     * @returns {{pathsNeedingBinding: string[], filesNeedingBinding: string[]}} 
     */
    private getBindingsFor(boilerplatePath: string): { pathsNeedingBinding: string[]; filesNeedingBinding: string[]; } {
        let pathsNeedingBinding: string[] = [];
        let filesNeedingBinding: string[] = [];
        const contentFolder = path.join(path.dirname(boilerplatePath), contentBoilerplateContentDirectoryName);
        if (! this._fileSystem.existsSync(contentFolder)) {
            throw new Error(`Missing folder with name ${contentBoilerplateContentDirectoryName} at root level when parsing boilerplate at path ${boilerplatePath}`);
        }
        
        let paths = this._folders.getFoldersAndFilesRecursivelyIn(contentFolder);
        paths = paths.filter((_: string) => {
            let include = true;
            binaryFiles.forEach(b => {
                if (_.toLowerCase().indexOf(b) > 0) include = false;
            });
            return include;
        });
        pathsNeedingBinding = paths.filter((_: string) => _.indexOf('{{') > 0).map((_: string) => _.substr(contentFolder.length + 1));
        paths.forEach((_: string) => {
            let stat = this._fileSystem.statSync(_);
            if (!stat.isDirectory()) {
                let file = this._fileSystem.readFileSync(_);
                if (file.indexOf('{{') >= 0) {
                    filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                }
            }
        });
        let ret = {
            pathsNeedingBinding,
            filesNeedingBinding
        };
        return ret;
        
    }
}