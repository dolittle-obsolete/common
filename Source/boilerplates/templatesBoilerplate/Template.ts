/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDependencies } from '@dolittle/tooling.common.dependencies';
import { getFileDirPath } from '@dolittle/tooling.common.files';
import { areas } from '@dolittle/tooling.common.utilities';
import * as _path from 'path';
import { ITemplatesBoilerplate, ITemplate } from '../index';

/**
 * Represents an implementation of {ITemplate}
 */
export class Template implements ITemplate
{
    private _filesToCreate: string[];

    /**
     * Instantiates an instance of {Template}.
     * @param {string} name
     * @param {string} type
     * @param {string} area
     * @param {string} description
     * @param {IDependencies} dependencies
     * @param {string[]} includedFiles
     * @param {string} path
     */
    constructor (name: string, type: string, area: string, description: string,
        dependencies: IDependencies, includedFiles: string[], path: string) {
        this.name = name;
        this.type = type;
        this.area = area;
        this.description = description;
        this.dependencies = dependencies || [];
        this.includedFiles = includedFiles || [];
        this.path = path;
    
        this.throwIfInvalidArea();

        const dir = getFileDirPath(this.path);
        this._filesToCreate = this.includedFiles.map(_ => _path.join(dir, _));
    }

    readonly name: string;

    readonly type: string;

    readonly area: string;

    readonly description: string;

    readonly dependencies: IDependencies;

    readonly includedFiles: string[];

    readonly path: string;
    
    get filesToCreate(): string[] {return this._filesToCreate;}

    getAllDependencies(boilerplate: ITemplatesBoilerplate): IDependency[] {return boilerplate.dependencies.dependencies.concat(this.dependencies.dependencies);}


    private throwIfInvalidArea(): void {
        if (!areas.includes(this.area)) {
            throw new Error('Invalid area');
        }
    }
}