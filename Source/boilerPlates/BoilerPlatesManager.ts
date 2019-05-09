/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import semver from 'semver';
import * as FsExtra from 'fs-extra';
import {Logger} from 'winston';
import * as Handlebars from 'handlebars';

import { Boilerplate, boilerplateContentFolderName } from './Boilerplate';
import { getFileNameAndExtension } from '../helpers';
import { Dependency } from '../dependencies/Dependency';
import { Folders } from '../Folders';
import { boilerplatesConfig, nodeModulesPath } from '../index';
import { artifactsBoilerplateType } from './artifacts/ArtifactsManager';
import { BaseBoilerplate } from './BaseBoilerplate';
import { ArtifactsBoilerplate } from './ArtifactsBoilerplate';
import { Scripts } from './Scripts';
import { ICanManageBoilerplates } from './ICanManageBoilerplates';
import { ArtifactTemplate } from './artifacts/ArtifactTemplate';
import { ICanCreateBoilerplates } from './ICanCreateBoilerplates';

const toolingPkg = require('../../package.json');

const boilerplatesDiscoverer = require('@dolittle/boilerplates-discoverer');

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
export class BoilerplatesManager implements ICanManageBoilerplates {
    private _needsReload = true;
    private _boilerplates!: BaseBoilerplate[];
    private _folders: Folders;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;
    private _handlebars: typeof Handlebars;

    /**
     * Initializes a new instance of {BoilerplatesManager}
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @param {typeof Handlebars} handlebars
     */
    constructor(folders: Folders, fileSystem: typeof FsExtra, logger: Logger, handlebars: typeof Handlebars) {
        this._folders = folders;
        this._fileSystem = fileSystem;
        this._handlebars = handlebars;
        this._logger = logger;

        if (! fileSystem.existsSync(boilerplatesConfig.path)) {
            boilerplatesConfig.store = boilerplatesConfig.store;
        }
    }
    /**
     * @inheritdoc
     */
    boilerplates(): BaseBoilerplate[] {
        if (!this._boilerplates || this._needsReload) this.loadBoilerplates();
        return this._boilerplates;
    }
    /**
     * @inheritdoc
     */
    hasBoilerplates(): boolean {
        return this.boilerplates() && this.boilerplates().length > 0;
    }
    /**
     * Gets the paths of the locally globally installed Dolittle boilerplates
     *
     * @readonly
     * @memberof BoilerplatesManager
     * @returns {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
     */
    installedBoilerplatePaths(): string[] {
        return boilerplatesDiscoverer.local(nodeModulesPath, [], 15);
    }
    /**
     * @inheritdoc
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[] {
        this.boilerplates()
        return this.boilerplates().filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language === language;
            return _.language === language
        });
    }

    /**
     * @inheritdoc
     */
    boilerplatesByType(type: string, namespace?: string): BaseBoilerplate[] {
        return this.boilerplates().filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.type === type;
            return _.type === type;
        });
    }

    /**
     * @inheritdoc
     */
    boilerplatesByLanguageAndType(language: string, type: string, namespace?: string): BaseBoilerplate[] {
        return this.boilerplates().filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language == language && _.type == type;
            return _.language == language && _.type == type;
        });
    }

    /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @param {string} [namespace=undefined]
     * @returns {Boilerplate[]}
     * @memberof BoilerplatesManager
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): Boilerplate[] {
        let boilerplates: Boilerplate[] = [];
        this.boilerplates().forEach(_ => {
            if (_ instanceof Boilerplate)
                boilerplates.push(_);
        });

        
        boilerplates =  boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && (_.parent && _.parent.type === parentType)
            return _.parent && _.parent.type === parentType;
        });
        if (parentLanguage) boilerplates = boilerplates.filter(_ => {
            if (_.parent.language) return _.parent.language === parentLanguage;
            return true;
        });
        if (parentName) boilerplates = boilerplates.filter(_ => {
            if (_.parent.name) return _.parent.name === parentName;
            return true;
        });

        return boilerplates;
    }
    
    /**
     * Discovers the globally installed boilerplates and adds the path to the folder of the boilerplate to the configuration using the name of package as the key 
     *
     * @memberof BoilerplatesManager
     */
    discoverInstalledBoilerplates() {
        let boilerplatesConfigObject: any = {};
        this.installedBoilerplatePaths().forEach(folderPath => {
            let packageJson = this._fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
            if (packageJson.dolittle.tooling === semver.major(toolingPkg.version).toString()) {
                if (boilerplatesConfigObject[packageJson.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${packageJson.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this._needsReload = true;
                boilerplatesConfigObject[packageJson.name] = folderPath;
            }
        });
        if (this._needsReload) boilerplatesConfig.store = boilerplatesConfigObject;
    }
    /**
     * Discovers boilerplates packages on npm. Returns the package.json' from the main registry of the latest versions of boilerplates compatible with the tooling major version.
     *
     * @param {string[]} keywords Additional keywords used in search
     * @param {number} limit 
     * @memberof BoilerplatesManager
     * @returns A list of compatible boilerplate packages
     */
    async discoverOnlineBoilerplates(keywords: string[] = [], limit: number = 250) {
        let boilerplates = [];  
        let boilerplatePackageNames = await boilerplatesDiscoverer(keywords, limit);

        for (let name of boilerplatePackageNames.map((_: any) => _.name)) {
            let compatibleBoilerplate = await boilerplatesDiscoverer.latestCompatible(name, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch((_: any) => {});
            if (compatibleBoilerplate) boilerplates.push(compatibleBoilerplate);
        }
        return boilerplates;
    }
    /**
     * Gets the package of the latest compatible boilerplate with the given package name 
     *
     * @param {string} boilerplatePackageName
     * @returns The package of the boilerplate
     * @memberof BoilerplatesManager
     */
    async latestCompatibleBoilerplate(boilerplatePackageName: string) {
        let boilerplate = await boilerplatesDiscoverer.latestCompatible(boilerplatePackageName, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString());
        return boilerplate;
    }
    /**
     * Discovers Dolittle boilerplates made by Dolittle on npm. Returns the package.json' from the main registry of the latest versions of dolittle boilerplates compatible with the tooling major version.
     * 
     *
     * @returns A list of compatible packages
     * @memberof BoilerplatesManager
     */
    async discoverOnlineDolittleBoilerplates() {
        let boilerplates = [];
        let dolittleBoilerplates = await boilerplatesDiscoverer.dolittle();

        for (let name of dolittleBoilerplates.map((_: any) => _.name)) {
            let compatibleBoilerplate = await boilerplatesDiscoverer.latestCompatible(name, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch((_: any) => {});
            if (compatibleBoilerplate) boilerplates.push(compatibleBoilerplate);
        }
        return boilerplates;
    }
    /**
     * Loads all boilerplates and sets the boilerplates property
     */
    loadBoilerplates() {
        this._boilerplates = [];
        let boilerplatesConfigObject = boilerplatesConfig.store;
        Object.keys(boilerplatesConfigObject).forEach(key => {
            let folderPath = path.resolve(boilerplatesConfigObject[key]);
            this._boilerplates.push(this.readBoilerplateFromFolder(folderPath));
        });
        this._needsReload = false;
    }
    /**
     * Create an instance of {Boilerplate} of an artifact into a specific destination folder with a given context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destination 
     * @param {any} context 
     */
    createArtifactBoilerplate(artifactTemplate: ArtifactTemplate, destination: string, context: any) {
        this._folders.makeFolderIfNotExists(destination);
        let filesToCreate = artifactTemplate.filesToCreate;
        
        filesToCreate.forEach( filePath => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = this._fileSystem.readFileSync(filePath, 'utf8');
            let segments: string[] = [];

            path.join(destination, filename).split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this._handlebars.compile(oldContent);
            let newContent = template(context);
            this._fileSystem.writeFileSync(newFilePath, newContent);
        });
    }
    
    /**
     * Reads the contents of a folder and returns the in-memory representation of the boilerplate.
     *
     * @param {string} folder The folder of a boilerplate
     * @returns {BaseBoilerplate}
     * @memberof BoilerplatesManager
     */
    private readBoilerplateFromFolder(folder: string): BaseBoilerplate {
        let boilerplatePath = path.join(folder, 'boilerplate.json');
        
        if (!this._fileSystem.existsSync(boilerplatePath)) throw new Error(`Could not find boilerplate configuration in '${folder}'`);

        let boilerplateObject = JSON.parse(this._fileSystem.readFileSync(boilerplatePath, 'utf8'));

        return this.parseBoilerplate(boilerplateObject, boilerplatePath);
    }

    /**
     * Parses a boilerplate read from a boilerplate package correctly
     * 
     * @param {*} boilerplateObject
     * @param {string} boilerplatePath The path of the boilerplate.json file
     * @returns {BaseBoilerplate}
     */
    private parseBoilerplate(boilerplateObject: any, boilerplatePath: string): BaseBoilerplate {
        if (boilerplateObject.type === artifactsBoilerplateType) {
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
                this._fileSystem
            );
        }
        else {
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
                bindings.filesNeedingBinding)
        }
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
        paths = paths.filter(_ => {
            let include = true;
            binaryFiles.forEach(b => {
                if (_.toLowerCase().indexOf(b) > 0) include = false;
            });
            return include;
        });
        pathsNeedingBinding = paths.filter(_ => _.indexOf('{{') > 0).map(_ => _.substr(contentFolder.length + 1));
        paths.forEach(_ => {
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