/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common.dependencies';
import { Folders } from '@dolittle/tooling.common.utilities';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { Logger } from 'winston';
import { artifactsBoilerplateType, ArtifactsBoilerplate, BaseBoilerplate, Boilerplate, boilerplateContentFolderName, IBoilerplatesLoader, Scripts, BoilerplatesConfig } from './internal';

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
 * Represents the manager of boiler plates
 */
export class BoilerplatesLoader implements IBoilerplatesLoader {
    private _loadedBoilerplates!: BaseBoilerplate[];

    /**
     * Initializes a new instance of {BoilerplatesManager}
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @param {typeof Handlebars} handlebars
     */
    constructor(private _boilerplatesConfig: BoilerplatesConfig, private _folders: Folders, private _fileSystem: typeof FsExtra, private _logger: Logger) {
        if (! this._fileSystem.existsSync(this._boilerplatesConfig.path)) {
            this._boilerplatesConfig.store = this._boilerplatesConfig.store;
        }
    }
    /**
     * @inheritdoc
     *
     * @memberof BoilerplatesLoader
     */
    needsReload = true;
    /**
     * @inheritdoc
     *
     * @readonly
     * @type {string}
     * @memberof BoilerplatesLoader
     */
    get boilerplatesPath(): string {return this._boilerplatesConfig.path;}
    /**
     * @inheritdoc
     *
     * @readonly
     * @type {BaseBoilerplate[]}
     * @memberof BoilerplatesLoader
     */
    get loadedBoilerplates(): BaseBoilerplate[] {
        if (!this._loadedBoilerplates || this.needsReload) return this.load();
        return this._loadedBoilerplates;
    }

    /**
     * @inheritdoc
     * 
     * @memberof BoilerplatesLoader
     */
    load(): BaseBoilerplate[] {
        this._logger.info('Loading boilerplates')
        this._loadedBoilerplates = [];
        let boilerplatesConfigObject: any = this._boilerplatesConfig.store;

        Object.keys(boilerplatesConfigObject).forEach(key => {
            let folderPath = path.resolve(boilerplatesConfigObject[key]);
            if (!this._fileSystem.existsSync(folderPath)) {
                this._logger.info(`Boilerplate path '${folderPath}' does not exist. Removing entry from boilerplates configuration`);
                delete boilerplatesConfigObject[key];
                this._boilerplatesConfig.store = boilerplatesConfigObject;
            }
            this._loadedBoilerplates.push(this.readBoilerplateFromFolder(folderPath));
        });
        this.needsReload = false;
        return this._loadedBoilerplates;
    }
    
    private readBoilerplateFromFolder(folder: string): BaseBoilerplate {
        let boilerplatePath = path.join(folder, 'boilerplate.json');
        
        if (!this._fileSystem.existsSync(boilerplatePath)) {
            this._logger.info(`The path of a boilerplate defined in the boilerplates configuration does not exists. Path: ${boilerplatePath}`);
            throw new Error(`Could not find boilerplate configuration in '${folder}'`);
        }

        let boilerplateObject = JSON.parse(this._fileSystem.readFileSync(boilerplatePath, 'utf8'));

        return this.parseBaseBoilerplate(boilerplateObject, boilerplatePath);
    }

    private parseBaseBoilerplate(boilerplateObject: any, boilerplatePath: string): BaseBoilerplate {
        if (boilerplateObject.type === artifactsBoilerplateType) 
            return this.parseArtifactsBoilerplate(boilerplateObject, boilerplatePath);
        else 
            return this.parseBoilerplate(boilerplateObject, boilerplatePath);
    }

    private parseArtifactsBoilerplate(boilerplateObject: any, boilerplatePath: string): ArtifactsBoilerplate {
        return new ArtifactsBoilerplate(
            boilerplateObject.language || 'any',
            boilerplateObject.name,
            boilerplateObject.description,
            boilerplateObject.type,
            boilerplateObject.dependencies !== undefined? 
                Object.keys(boilerplateObject.dependencies).map(key => Dependency.fromJson(boilerplateObject.dependencies[key], key))
                : [],
            boilerplateObject.namespace,
            Scripts.fromJson(boilerplateObject.scripts),
            boilerplatePath,
            this._folders,
            this._fileSystem);
    }
    private parseBoilerplate(boilerplateObject: any, boilerplatePath: string): Boilerplate {
        let bindings = this.getBoilerplateBindings(boilerplatePath);
        return new Boilerplate(
            boilerplateObject.language || 'any',
            boilerplateObject.name,
            boilerplateObject.description,
            boilerplateObject.type,
            boilerplateObject.dependencies !== undefined? 
                Object.keys(boilerplateObject.dependencies).map(key => Dependency.fromJson(boilerplateObject.dependencies[key], key))
                : [],
            boilerplateObject.namespace,
            Scripts.fromJson(boilerplateObject.scripts),
            boilerplateObject.target,
            boilerplateObject.framework,
            boilerplateObject.parent,
            boilerplatePath,
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
    private getBoilerplateBindings(boilerplatePath: string): { pathsNeedingBinding: string[]; filesNeedingBinding: string[]; } {
        let pathsNeedingBinding: string[] = [];
        let filesNeedingBinding: string[] = [];
        const contentFolder = path.join(path.dirname(boilerplatePath), boilerplateContentFolderName);
        if (! this._fileSystem.existsSync(contentFolder)) {
            throw new Error(`Missing folder with name ${boilerplateContentFolderName} at root level when parsing boilerplate at path ${boilerplatePath}`);
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