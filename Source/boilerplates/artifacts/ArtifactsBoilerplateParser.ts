/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import * as FsExtra from 'fs-extra';
import { IDependencyParsers } from "@dolittle/tooling.common.dependencies";
import { Folders } from "@dolittle/tooling.common.utilities";
import { ArtifactsBoilerplate, ICanParseBoilerplates, artifactsBoilerplateType, Scripts } from "../index";

/**
 * Represents an implementation of {ICanParseBoilerplates} for parsing {ArtifactsBoilerplate} boilerplates
 *
 * @export
 * @class ArtifactsBoilerplateParser
 */
export class ArtifactsBoilerplateParser implements ICanParseBoilerplates {

    /**
     * Instantiates an instance of {ArtifactsBoilerplateParser}.
     * @param {IDependencyParsers} _dependencyParsers
     * @param {Folders} _folders
     * @param {typeof FsExtra} _fileSystem
     */
    constructor (private _dependencyParsers: IDependencyParsers, private _folders: Folders, private _fileSystem: typeof FsExtra) {}
    
    canParse(boilerplate: any) {
        return boilerplate.type === artifactsBoilerplateType;
    }
    
    parse(boilerplate: any, boilerplatePath: string) {
        return new ArtifactsBoilerplate(
            boilerplate.language || 'any',
            boilerplate.name,
            boilerplate.description,
            boilerplate.type,
            boilerplate.dependencies !== undefined? 
                Object.keys(boilerplate.dependencies).map(key => this._dependencyParsers.parse(boilerplate.dependencies[key], key))
                : [],
                boilerplate.namespace,
            Scripts.fromJson(boilerplate.scripts),
            boilerplatePath,
            this._folders,
            this._fileSystem);
        
    }
}