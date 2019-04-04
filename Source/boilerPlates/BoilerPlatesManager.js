/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import semver from 'semver';
import { Boilerplate } from './Boilerplate';
import { getFileNameAndExtension, getFileDirPath } from '../helpers';
import { dependencyFromJson } from '../dependencies/Dependency';
import { HttpWrapper } from '../HttpWrapper';
import { Folders } from '../Folders';
import { ConfigManager } from '../configuration/ConfigManager';
import { ArtifactTemplate } from '../artifacts/ArtifactTemplate';
import {boilerplatesConfig, nodeModulesPath} from '../index';
import artifactsBoilerplateType from '../artifacts/ArtifactsManager';

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
export class BoilerplatesManager {
    needsReload = true;
    #_boilerplates;
    #_configManager;
    #_httpWrapper;
    #_folders;
    #_fileSystem;
    #_logger;
    #_handlebars;

    /**
     * Initializes a new instance of {BoilerplatesManager}
     * @param {ConfigManager} configManager 
     * @param {HttpWrapper} httpWrapper
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @param {import('handlebars')} handlebars
     */
    constructor(configManager, httpWrapper, folders, fileSystem, logger, handlebars) {
        this.#_configManager = configManager;
        this.#_httpWrapper = httpWrapper;
        this.#_folders = folders;
        this.#_fileSystem = fileSystem;
        this.#_handlebars = handlebars;
        this.#_logger = logger;
        this.#_boilerplates = undefined;

        if (! fileSystem.existsSync(boilerplatesConfig.path)) {
            boilerplatesConfig.store = boilerplatesConfig.store;
        }
    }
    /**
     * 
     * @type {ConfigManager}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get configManager() {
        return this.#_configManager;
    }
    /**
     * 
     * @type {HttpWrapper}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get httpWrapper() {
        return this.#_httpWrapper;
    }
    /**
     * 
     * @type {Folders}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get folders() {
        return this.#_folders;
    }
    /**
     * 
     * @type {import('fs-extra')}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get fileSystem() {
        return this.#_fileSystem;
    }
    /**
     * 
     * @type {import('winston').Logger}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get logger() {
        return this.#_logger;
    }
    /**
     * 
     * @type {import('handlebars')}
     * @readonly
     * @memberof BoilerplatesManager
     */
    get handlebars() {
        return this.#_handlebars;
    }
    /**
     * Get all available boiler plates
     * @returns {Boilerplate[]} Available boiler plates
     */
    get boilerplates() {
        if (!this.#_boilerplates || this.needsReload) this.loadBoilerplates();
        return this.#_boilerplates;
    }
    /**
     * Gets whether or not there are boiler plates installed
     * @returns {boolean} True if there are, false if not
     */
    get hasBoilerplates() {
        return this.#_boilerplates && this.#_boilerplates.length > 0;
    }
    /**
     * Gets the paths of the locally globally installed Dolittle boilerplates
     *
     * @readonly
     * @memberof BoilerplatesManager
     * @returns {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
     */
    get installedBoilerplatePaths() {
        return boilerplatesDiscoverer.local(nodeModulesPath, [], 15);
    }
    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    boilerplatesByLanguage(language) {
        return this.boilerplates.filter(boilerplate => boilerplate.language == language);
    }

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @returns {Boilerplate[]} Available boiler plates for the type
     */
    boilerplatesByType(type) {
        return this.boilerplates.filter(boilerplate => boilerplate.type == type);
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @returns {Boilerplate[]} Available boiler plates for the language
     */
    boilerplatesByLanguageAndType(language, type) {
        return this.boilerplates.filter(boilerplate => boilerplate.language == language && boilerplate.type == type);
    }

    /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @returns {Boilerplate[]}
     * @memberof BoilerplatesManager
     */
    getAdornments(parentType, parentLanguage = undefined, parentName = undefined) {
        let boilerplates = this.boilerplates.filter(boilerplate => boilerplate.parent && boilerplate.parent.type === parentType);
        if (parentLanguage) boilerplates = boilerplates.filter(boilerplate => {
                if (boilerplate.parent.language) return boilerplate.parent.language === parentLanguage;
                return true;
            });
        if (parentName) boilerplates = boilerplates.filter(boilerplate => {
            if (boilerplate.parent.name) return boilerplate.parent.name === parentName;
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
        let boilerplatesConfigObject = {};
        this.installedBoilerplatePaths.forEach(folderPath => {
            let packageJson = this.fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
            if (packageJson.dolittle.tooling === semver.major(toolingPkg.version)) {
                if (boilerplatesConfigObject[packageJson.name]) {
                    this.logger.warn(`Discovered a boilerplate with an already in-use name '${packageJson.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this.needsReload = true;
                boilerplatesConfigObject[packageJson.name] = folderPath;
            }
        });
        if (this.needsReload) boilerplatesConfig.store = boilerplatesConfigObject;
    }
    /**
     * Discovers boilerplates packages on npm. Returns the package.json' from the main registry of the latest versions of boilerplates compatible with the tooling major version.
     *
     * @param {string[]} keywords Additional keywords used in search
     * @param {number} limit 
     * @memberof BoilerplatesManager
     * @returns A list of compatible boilerplate packages
     */
    async discoverOnlineBoilerplates(keywords = [], limit = 250) {
        let boilerplates = [];  
        let boilerplatePackageNames = await boilerplatesDiscoverer(keywords, limit);

        for (let name of boilerplatePackageNames.map(_ => _.name)) {
            let compatibleBoilerplate = await boilerplatesDiscoverer.latestCompatible(name, pkgJson => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch(_ => {});
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
    async latestCompatibleBoilerplate(boilerplatePackageName) {
        let boilerplate = await boilerplatesDiscoverer.latestCompatible(boilerplatePackageName, pkgJson => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString());
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

        for (let name of dolittleBoilerplates.map(_ => _.name)) {
            let compatibleBoilerplate = await boilerplatesDiscoverer.latestCompatible(name, pkgJson => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch(_ => {});
            if (compatibleBoilerplate) boilerplates.push(compatibleBoilerplate);
        }
        return boilerplates;
    }
    /**
     * Loads all boilerplates and sets the boilerplates property
     */
    loadBoilerplates() {
        this.#_boilerplates = [];
        let boilerplatesConfigObject = boilerplatesConfig.store;
        Object.keys(boilerplatesConfigObject).forEach(key => {
            let folderPath = path.resolve(boilerplatesConfigObject[key]);
            this.#_boilerplates.push(this.#_readBoilerplateFromFolder(folderPath));
        });
        this.needsReload = false;
    }

    /**
     * Create an instance of {Boilerplate} into a specific destination folder with a given context
     * @param {Boilerplate} boilerplate 
     * @param {string} destination 
     * @param {object} context 
     */
    createInstance(boilerplate, destination, context) {
        this.folders.makeFolderIfNotExists(destination);
        this.folders.copy(destination, boilerplate.contentDirectory);
        boilerplate.pathsNeedingBinding.forEach(_ => {
            let pathToRename = path.join(destination, _);
            let segments = [];
            pathToRename.split(/(\\|\/)/).forEach(segment => segments.push(this.handlebars.compile(segment)(context)));
            let result = segments.join('');
            this.fileSystem.renameSync(pathToRename, result);
        });
        
        boilerplate.filesNeedingBinding.forEach(_ => {
            let file = path.join(destination, _);
            let content = this.fileSystem.readFileSync(file, 'utf8');
            let template = this.handlebars.compile(content);
            let result = template(context);
            this.fileSystem.writeFileSync(file, result);
        });
    }
    /**
     * Create an instance of {Boilerplate} of an artifact into a specific destination folder with a given context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destination 
     * @param {any} context 
     */
    createArtifactInstance(artifactTemplate, destination, context) {
        this.folders.makeFolderIfNotExists(destination);
        let filesToCreate = artifactTemplate.getFilesToCreate();
        
        filesToCreate.forEach( filePath => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = this.fileSystem.readFileSync(filePath, 'utf8');
            let segments = [];

            path.join(destination, filename).split(/(\\|\/)/).forEach(segment => segments.push(this.handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this.handlebars.compile(oldContent);
            let newContent = template(context);
            this.fileSystem.writeFileSync(newFilePath, newContent);
        });
    }
    
    /**
     * Reads the contents of a folder and returns the in-memory representation of the boilerplate.
     *
     * @param {string} folder The folder of a boilerplate
     * @returns {Boilerplate}
     * @memberof BoilerplatesManager
     */
    #_readBoilerplateFromFolder(folder) {
        let boilerplatePath = path.join(folder, 'boilerplate.json');
        
        if (!this.fileSystem.existsSync(boilerplatePath)) throw new Error(`Could not find boilerplate configuration in '${folder}'`);

        let boilerplateObject = JSON.parse(this.fileSystem.readFileSync(boilerplatePath, 'utf8'));

        return this.#_parseBoilerplate(boilerplateObject, boilerplatePath);
    }

    /**
     * Parses a boilerplate read from a boilerplate package correctly
     * 
     * @param {*} boilerplateObject
     * @param {string} boilerplatePath The path of the boilerplate.json file
     */
    #_parseBoilerplate(boilerplateObject, boilerplatePath) {
        boilerplateObject.path = boilerplatePath;
        let pathsNeedingBinding = boilerplateObject.pathsNeedingBinding || [];
        let filesNeedingBinding = boilerplateObject.filesNeedingBinding || [];
        
        if (boilerplateObject.type != artifactsBoilerplateType) {
            const contentFolder = path.join(path.dirname(boilerplatePath), 'Content');
            if (! this.fileSystem.existsSync(contentFolder)) {
                throw new Error(`Missing Content Folder when parsing boilerplate at path ${boilerplatePath}`);
            }
            
            if (! boilerplateObject.pathsNeedingBinding || ! boilerplateObject.filesNeedingBinding) {
                let paths = this.folders.getFoldersAndFilesRecursivelyIn(contentFolder);
                paths = paths.filter(_ => {
                    let include = true;
                    binaryFiles.forEach(b => {
                        if (_.toLowerCase().indexOf(b) > 0) include = false;
                    });
                    return include;
                });
                pathsNeedingBinding = paths.filter(_ => _.indexOf('{{') > 0).map(_ => _.substr(contentFolder.length + 1));
                filesNeedingBinding = [];
                paths.forEach(_ => {
                    let stat = this.fileSystem.statSync(_);
                    if (!stat.isDirectory()) {
                        let file = this.fileSystem.readFileSync(_);
                        if (file.indexOf('{{') >= 0) {
                            filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                        }
                    }
                });
            }
        }
        boilerplateObject.pathsNeedingBinding = pathsNeedingBinding;
        boilerplateObject.filesNeedingBinding = filesNeedingBinding;
        
        return new Boilerplate(
            boilerplateObject.language || 'any',
            boilerplateObject.name,
            boilerplateObject.description,
            boilerplateObject.type,
            boilerplateObject.dependencies !== undefined? 
                Object.keys(boilerplateObject.dependencies).map(key => dependencyFromJson(boilerplateObject.dependencies[key], key))
                : [],
            boilerplateObject.target,
            boilerplateObject.framework,
            boilerplateObject.parent,
            boilerplateObject.path,
            boilerplateObject.pathsNeedingBinding ,
            boilerplateObject.filesNeedingBinding
        );
    }

    #_warnIfUsingOldSystem() {
        const filePath = path.join(this.configManager.centralFolderLocation, 'boiler-plates.json');
        if (this.fileSystem.existsSync(filePath)) {
            throw new Error(
`I see that there has been a long time since you've updated the dolittle tooling.

Please delete the file ${filePath}`
            );
        }
    }
}