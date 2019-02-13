/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import { BoilerPlate } from './BoilerPlate';
import { getFileNameAndExtension, getFileDirPath } from '../helpers';
import { dependencyFromJson } from '../dependencies/Dependency';
import { HttpWrapper } from '../HttpWrapper';
import { Folders } from '../Folders';
import { ConfigManager } from '../configuration/ConfigManager';
import { ArtifactTemplate } from '../artifacts/ArtifactTemplate';
import boilerplatesDiscoverer from '@dolittle/boilerplates-discoverer';

const boilerplatesFolder = 'boilerplates';
const boilerPlateConfigurationName = 'boilerplates.json';

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
export class BoilerPlatesManager {
    needsReload = true;
    #boilerPlates;
    #configManager;
    #httpWrapper;
    #folders;
    #fileSystem;
    #git;
    #logger;
    #handlebars;

    /**
     * Initializes a new instance of {BoilerPlatesManager}
     * @param {ConfigManager} configManager 
     * @param {HttpWrapper} httpWrapper
     * @param {import('simple-git/src/git')} git
     * @param {Folders} folders
     * @param {import('fs-extra')} fileSystem
     * @param {import('winston').Logger} logger
     * @param {import('handlebars')} handlebars
     */
    constructor(configManager, httpWrapper, git, folders, fileSystem, logger, handlebars) {
        this.#configManager = configManager;
        this.#httpWrapper = httpWrapper;
        this.#folders = folders;
        this.#fileSystem = fileSystem;
        this.#git = git;
        this.#handlebars = handlebars;
        this.#logger = logger;
        this.#boilerPlates = undefined;
    }

    init() {
        this.#folders.makeFolderIfNotExists(this.boilerPlatesFolderLocation);
        if (! this.fileSystem.existsSync(this.boilerPlatesConfigurationLocation)) {
            this.fileSystem.writeJsonSync(this.boilerPlatesConfigurationLocation, {}, {encoding: 'utf8', spaces: 4});
            this.fileSystem.writeFileSync(path.join(this.boilerPlatesFolderLocation, 'readme.md'), 
`${boilerPlateConfigurationName} is a map where the key is the package name, unique identifier, of a boilerplate and the value is the absolute or relative path to the boilerplate folder.
You can easily create custom boilerplates that aren't npm packages by creating a folder, create a boilerplate.json and a Content folder. 

You can see examples of how boilerplates are made at https://github.com/dolittle-boilerplates/`);
            this.discoverInstalledBoilerplates();
        }
        this.#warnIfUsingOldSystem();
    }
    /**
     * Gets path of the Dolittle boilerplates folder
     * @returns {string} Base path of boiler plates
     */
    get boilerPlatesFolderLocation() {
        return path.join(this.#configManager.centralFolderLocation, boilerplatesFolder);
    }
    /**
     * Gets path of the Dolittle boilerplates configuration. This is a file containing both boilerplates that are not published and installed as packages and paths to Dolittle boilerplate folders
     *
     * @readonly
     * @memberof BoilerPlatesManager
     */
    get boilerPlatesConfigurationLocation() {
        return path.join(this.boilerPlatesFolderLocation, boilerPlateConfigurationName);
    }

    /**
     * Get all available boiler plates
     * @returns {BoilerPlate[]} Available boiler plates
     */
    get boilerPlates() {
        if (!this.#boilerPlates || this.needsReload) this.loadBoilerplates();
        return this.#boilerPlates;
    }
    /**
     * Gets whether or not there are boiler plates installed
     * @returns {boolean} True if there are, false if not
     */
    get hasBoilerPlates() {
        return this.#boilerPlates && this.#boilerPlates.length > 0;
    }

    /**
     * Gets the filesystem
     * @returns {import('fs-extra')}
     */
    get fileSystem() {
        return this.#fileSystem;
    }
    /**
     * Gets the paths of the locally globally installed Dolittle boilerplates
     *
     * @readonly
     * @memberof BoilerPlatesManager
     * @returns {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
     */
    get installedBoilerplatePaths() {
        return boilerplatesDiscoverer.local([], 15);
    }
    /**
     * Discovers the globally installed boilerplates and adds the path to the folder to the boilerplates configuration using the name of package as the key 
     *
     * @memberof BoilerPlatesManager
     */
    discoverInstalledBoilerplates() {
        if (! this.fileSystem.existsSync(this.boilerPlatesConfigurationLocation)) throw new Error(`Could not find boilerplate configuration at ${this.boilerPlatesConfigurationLocation}. You have to initialize the boilerplates system first`);
        let boilerplatesConfig = this.fileSystem.readJsonSync(this.boilerPlatesConfigurationLocation);
        this.installedBoilerplatePaths.forEach(folderPath => {
            let packageJson = this.fileSystem.readJsonSync(path.join(folderPath, 'package.json'));
            if (!boilerplatesConfig[packageJson.name] || boilerplatesConfig[packageJson] !== folderPath) this.needsReload = true;
            boilerplatesConfig[packageJson.name] = folderPath;
        });
        this.fileSystem.writeJsonSync(this.boilerPlatesConfigurationLocation, boilerplatesConfig, {encoding: 'utf8', spaces: 4});
    }
    /**
     * Discovers boilerplates packages on npm. 
     *
     * @param {string[]} keywords Additional keywords used in search
     * @param {number} limit 
     * @memberof BoilerPlatesManager
     * @returns {Promise<{name: string, description: string}>}
     */
    async discoverOnlineBoilerplates(keywords = [], limit = 250) {
       let boilerplatePackageNames = await boilerplatesDiscoverer(keywords, limit);
       return boilerplatePackageNames;
    }
    /**
     * Discovers Dolittle boilerplates made by Dolittle on npm
     *
     * @returns {*} A list of packages
     * @memberof BoilerPlatesManager
     */
    async discoverOnlineDolittleBoilerplates() {
        let boilerplatePackages = await boilerplatesDiscoverer.dolittle();
        return boilerplatePackages;
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @returns {BoilerPlate[]} Available boiler plates for the language
     */
    boilerPlatesByLanguage(language) {
        return this.boilerPlates.filter(boilerPlate => boilerPlate.language == language);
    }

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @returns {BoilerPlate[]} Available boiler plates for the type
     */
    boilerPlatesByType(type) {
        return this.boilerPlates.filter(boilerPlate => boilerPlate.type == type);
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @returns {BoilerPlate[]} Available boiler plates for the language
     */
    boilerPlatesByLanguageAndType(language, type) {
        return this.boilerPlates.filter(boilerPlate => boilerPlate.language == language && boilerPlate.type == type);
    }

    /**
     * Gets the adornment boilerplates that has a parent with the given fields
     *
     * @param {string} parentType
     * @param {string} [parentLanguage=undefined]
     * @param {string} [parentName=undefined]
     * @returns {BoilerPlate[]}
     * @memberof BoilerPlatesManager
     */
    getAdornments(parentType, parentLanguage = undefined, parentName = undefined) {
        let boilerplates = this.boilerplates.filter(boilerplate => boilerplate.parent && boilerplate.parent.type === parentType);
        if (parentLanguage) boilerplates = boilerplates.filter(boilerplate => boilerplate.parent && boilerplate.parent.language === parentLanguage);
        if (parentName) boilerplates = boilerplates.filter(boilerplate => boilerplate.parent && boilerplate.parent.name === parentName);
        
        return boilerplates;
    }
    /**
     * Loads all boilerplates and sets the boilerPlates property
     */
    loadBoilerplates() {
        if (! this.fileSystem.existsSync(this.boilerPlatesConfigurationLocation)) {
            throw new Error(`Could not find local boilerplates configuration at path ${this.boilerPlatesConfigurationLocation}. This means that tooling hasn't been initialized.`);
        }
        this.#boilerPlates = [];
        let boilerPlatesConfig = this.fileSystem.readJsonSync(this.boilerPlatesConfigurationLocation);
        Object.keys(boilerPlatesConfig).forEach(key => {
            let folderPath = path.resolve(boilerPlatesConfig[key]);
            this.#boilerPlates.push(...this.#readBoilerplatesFromFolder(folderPath));
        });
        this.needsReload = false;
    }

    /**
     * Create an instance of {BoilerPlate} into a specific destination folder with a given context
     * @param {BoilerPlate} boilerPlate 
     * @param {string} destination 
     * @param {object} context 
     */
    createInstance(boilerPlate, destination, context) {
        this.#folders.makeFolderIfNotExists(destination);
        this.#folders.copy(destination, boilerPlate.contentDirectory);
        boilerPlate.pathsNeedingBinding.forEach(_ => {
            let pathToRename = path.join(destination, _);
            let segments = [];
            pathToRename.split(/(\\|\/)/).forEach(segment => segments.push(this.#handlebars.compile(segment)(context)));
            let result = segments.join('');
            this.fileSystem.renameSync(pathToRename, result);
        });
        
        boilerPlate.filesNeedingBinding.forEach(_ => {
            let file = path.join(destination, _);
            let content = this.fileSystem.readFileSync(file, 'utf8');
            let template = this.#handlebars.compile(content);
            let result = template(context);
            this.fileSystem.writeFileSync(file, result);
        });
    }
    /**
     * Create an instance of {BoilerPlate} of an artifact into a specific destination folder with a given context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destination 
     * @param {any} context 
     */
    createArtifactInstance(artifactTemplate, destination, context) {
        this.#folders.makeFolderIfNotExists(destination);
        let filesToCreate = artifactTemplate.getFilesToCreate();
        
        filesToCreate.forEach( filePath => {
            const filename = getFileNameAndExtension(filePath);
            const oldContent = this.fileSystem.readFileSync(filePath, 'utf8');
            let segments = [];

            path.join(destination, filename).split(/(\\|\/)/).forEach(segment => segments.push(this.#handlebars.compile(segment)(context)));
            let newFilePath = segments.join('');
           
            let template = this.#handlebars.compile(oldContent);
            let newContent = template(context);
            this.fileSystem.writeFileSync(newFilePath, newContent);
        });
    }
    
    /**
     * Reads the contents of a folder and discovers boilerplates. Returns a list of boilerplates
     *
     * @param {string} folder The folder to search for boilerplates
     * @returns {BoilerPlate[]} A list of boilerplates
     * @memberof BoilerPlatesManager
     */
    #readBoilerplatesFromFolder(folder) {
        let boilerPlates = [];
        let boilerPlatesPaths = this.#folders.searchRecursive(folder, 'boilerplate.json');
        
        boilerPlatesPaths.forEach(boilerPlatePath => {
            let boilerPlateObject = JSON.parse(this.#fileSystem.readFileSync(boilerPlatePath, 'utf8'));
            boilerPlates.push(this.#parseBoilerPlate(boilerPlateObject, boilerPlatePath));
        });
        return boilerPlates;
    }

    /**
     * Parses a boilerplate read from a boilerplate package correctly
     * 
     * @param {*} boilerPlateObject
     * @param {string} boilerPlatePath The path of the boilerplate.json file
     */
    #parseBoilerPlate(boilerPlateObject, boilerPlatePath) {
        boilerPlateObject.path = boilerPlatePath;
        let pathsNeedingBinding = boilerPlateObject.pathsNeedingBinding || [];
        let filesNeedingBinding = boilerPlateObject.filesNeedingBinding || [];
        
        if (boilerPlateObject.type != 'artifacts') {
            const contentFolder = path.join(path.dirname(boilerPlatePath), 'Content');
            if (! this.fileSystem.existsSync(contentFolder)) {
                throw new Error(`Missing Content Folder when parsing boilerplate at path ${boilerPlatePath}`);
            }
            
            if (! boilerPlateObject.pathsNeedingBinding || ! boilerPlateObject.filesNeedingBinding) {
                let paths = this.#folders.getFoldersAndFilesRecursivelyIn(contentFolder);
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
                    let stat = this.#fileSystem.statSync(_);
                    if (!stat.isDirectory()) {
                        let file = this.#fileSystem.readFileSync(_);
                        if (file.indexOf('{{') >= 0) {
                            filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                        }
                    }
                });
            }
        }
        boilerPlateObject.pathsNeedingBinding = pathsNeedingBinding;
        boilerPlateObject.filesNeedingBinding = filesNeedingBinding;
        
        return new BoilerPlate(
            boilerPlateObject.language || 'any',
            boilerPlateObject.name,
            boilerPlateObject.description,
            boilerPlateObject.type,
            boilerPlateObject.dependencies !== undefined? 
                Object.keys(boilerPlateObject.dependencies).map(key => dependencyFromJson(boilerPlateObject.dependencies[key], key))
                : [],
            boilerPlateObject.target,
            boilerPlateObject.framework,
            boilerPlateObject.parent,
            boilerPlateObject.path,
            boilerPlateObject.pathsNeedingBinding ,
            boilerPlateObject.filesNeedingBinding
        );
    }

    #warnIfUsingOldSystem() {
        const filePath = path.join(this.#configManager.centralFolderLocation, 'boiler-plates.json');
        if (this.#fileSystem.existsSync(filePath)) {
            throw new Error(
`I see that there has been a long time since you've updated the dolittle tooling.

Please delete the file ${filePath} and all the boilerplates in ${this.boilerPlatesConfigurationLocation} that is not your own custom boilerplate.
`
            );
        }
    }
}