/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyParsers, DependenciesWithStandardValidators } from '@dolittle/tooling.common.dependencies';
import { IFolders, IFileSystem } from '@dolittle/tooling.common.files';
import path from 'path';
import { ICanParseBoilerplates, Scripts, ContentBoilerplate, contentBoilerplateContentDirectoryName, CannotParseBoilerplate, boilerplateIsContentBoilerplate, contentBoilerplateContentDirectoryFromPath } from '../internal';

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
 * @class ContentBoilerplateParser
 */
export class ContentBoilerplateParser implements ICanParseBoilerplates {

    /**
     * Instantiates an instance of {ContentBoilerplateParser}.
     * @param {IDependencyParsers} _dependencyParsers
     * @param {IFolders} _folders
     * @param {IFileSystem} _fileSystem
     */
    constructor (private _dependencyParsers: IDependencyParsers, private _folders: IFolders, private _fileSystem: IFileSystem) {}

    canParse(boilerplate: any) {
        return boilerplateIsContentBoilerplate(boilerplate);
    }

    async parse(boilerplate: any, boilerplatePath: string) {
        if (!this.canParse(boilerplate)) throw new CannotParseBoilerplate(boilerplatePath);
        const bindings = await this.getBindingsFor(boilerplatePath);
        return new ContentBoilerplate(
            boilerplate.language || 'any',
            boilerplate.name,
            boilerplate.description,
            boilerplate.type,
            boilerplate.dependencies !== undefined ?
                new DependenciesWithStandardValidators(Object.keys(boilerplate.dependencies)
                    .map(key => this._dependencyParsers.parse(boilerplate.dependencies[key], key)))
                : new DependenciesWithStandardValidators([]),
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
    private async getBindingsFor(boilerplatePath: string): Promise<{ pathsNeedingBinding: string[]; filesNeedingBinding: string[]; }> {
        let pathsNeedingBinding: string[] = [];
        const filesNeedingBinding: string[] = [];
        const contentFolder = path.join(path.dirname(boilerplatePath), contentBoilerplateContentDirectoryName);
        const fileExists = await this._fileSystem.exists(contentFolder);
        if (! fileExists) {
            throw new Error(`Missing folder with name ${contentBoilerplateContentDirectoryName} at root level when parsing boilerplate at path ${boilerplatePath}`);
        }

        let paths = await this._folders.getFilesAndFoldersRecursively(contentFolder);
        paths = this.filterOutBinaryFiles(paths);
        pathsNeedingBinding = paths.filter(_ => _.indexOf('{{') > 0).map(_ => _.substr(contentFolder.length + 1));
        await Promise.all(paths.map(async _ => {
            const stat = await this._fileSystem.stat(_);
            if (!stat.isDirectory()) {
                const file = await this._fileSystem.readFile(_);
                if (file.indexOf('{{') >= 0) {
                    filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                }
            }
        }));
        const ret = {
            pathsNeedingBinding,
            filesNeedingBinding
        };
        return ret;

    }

    private filterOutBinaryFiles(filePaths: string[]) {
        return filePaths.filter(_ => {
            let include = true;
            binaryFiles.forEach(b => {
                if (_.toLowerCase().indexOf(b) > 0) include = false;
            });
            return include;
        });
    }
}
