/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyParsers, IDependency } from '@dolittle/tooling.common.dependencies';
import { areas, getFileDirPath } from '@dolittle/tooling.common.utilities';
import * as _path from 'path';
import { ArtifactsBoilerplate } from '../index';

function throwIfInvalidArea(area: string): void {
    if (!areas.includes(area)) {
        throw new Error('Invalid area');
    }
}
/**
 * Represents an artifact template
 */
export class ArtifactTemplate
{
    /**
     * Creates an {ArtifactTemplate} from a json object
     *
     * @static
     * @param {*} obj The template json object
     * @param {string} path The path of the template file
     * @param {string[]} includedFiles The files that needs to be created by the template
     * @param {ArtifactsBoilerplate} boilerplate
     * @returns
     */
    static fromJson(obj: any, path: string, includedFiles: string[], boilerplate: ArtifactsBoilerplate) {
        return new ArtifactTemplate(boilerplate, obj.name, obj.type, obj.area, obj.description,
            obj.dependencies !== undefined? 
                Object.keys(obj.dependencies).map(key => dependencyParsers.parse(obj.dependencies[key], key))
                : [], includedFiles, path);
    }

    private _allDependencies: IDependency[];
    private _filesToCreate: string[];

    /**
     * Instantiates an instance of {ArtifactTemplate}.
     * @param {ArtifactsBoilerplate} boilerplate
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {Dependency[]} dependencies
     * @param {string[]} includedFiles
     * @param {string} path
     */
    constructor (boilerplate: ArtifactsBoilerplate, name: string, type: string, area: string, description: string,
        dependencies: IDependency[], includedFiles: string[], path: string) {
        this.boilerplate = boilerplate;
        this.name = name;
        this.type = type;
        this.area = area;
        this.description = description;
        this.dependencies = dependencies || [];
        this.includedFiles = includedFiles || [];
        this.path = path;
    
        throwIfInvalidArea(area);
        
        this._allDependencies = [];
        this._allDependencies.push(...this.boilerplate.dependencies);
        this._allDependencies.push(...this.dependencies);

        const dir = getFileDirPath(this.path);
        this._filesToCreate = this.includedFiles.map(_ => _path.join(dir, _));
    }

    /**
     * The parent boilerplate object of the artifact template
     *
     * @type {ArtifactsBoilerplate}
     */
    readonly boilerplate: ArtifactsBoilerplate;

    /**
     * The name of the artifact template
     *
     * @type {string}
     */
    readonly name: string;

    /**
     * The type of the artifact template
     *
     * @type {string}
     */
    readonly type: string;

    /**
     * The area of the artifact.
     *
     * @type {string}
     */
    readonly area: string;

    /**
     * The description of the artifact template
     *
     * @type {string}
     */
    readonly description: string;

    /**
     * Gets the dependencies of the template
     *
     * @type {Dependency[]}
     */
    readonly dependencies: IDependency[];

    /**
     * The list of files that needs to be templated
     *
     * @type {string[]}
     */
    readonly includedFiles: string[];

    /**
     * Gets the path of the template file
     *
     * @type {string}
     */
    readonly path: string;
    
    /**
     * Gets all the dependencies needed to create this artifact
     *
     * @returns {Dependency[]}
     */
    get allDependencies(): IDependency[] {return this._allDependencies;}

    /**
     * Gets a list of the files that needs to be created
     *
     * @returns {string[]}
     */
    get filesToCreate(): string[] {return this._filesToCreate;}
}