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

const boilerPlateFolder = 'boiler-plates';

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

        this.#folders.makeFolderIfNotExists(this.boilerPlateLocation);

        this.#logger = logger;
        this.#handlebars = handlebars;
        this.readBoilerPlates();
    }

    /**
     * Gets base path for boiler plates
     * @returns {string} Base path of boiler plates
     */
    get boilerPlateLocation() {
        return path.join(this.#configManager.centralFolderLocation, boilerPlateFolder);
    }

    /**
     * Gets path to the boiler plates config file
     * @returns {string} Path to the config file
     */
    get boilerPlateConfigFile() {
        return path.join(this.#configManager.centralFolderLocation, 'boiler-plates.json');
    }

    /**
     * Get all available boiler plates
     * @returns {BoilerPlate[]} Available boiler plates
     */
    get boilerPlates() {
        return this.#boilerPlates;
    }
    /**
     * Gets the filesystem
     * @returns {import('fs-extra')}
     */
    get fileSystem() {
        return this.#fileSystem;
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @returns {BoilerPlate[]} Available boiler plates for the language
     */
    boilerPlatesByLanguage(language) {
        return this.#boilerPlates.filter(boilerPlate => boilerPlate.language == language);
    }

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @returns {BoilerPlate[]} Available boiler plates for the type
     */
    boilerPlatesByType(type) {
        return this.#boilerPlates.filter(boilerPlate => boilerPlate.type == type);
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @returns {BoilerPlate[]} Available boiler plates for the language
     */
    boilerPlatesByLanguageAndType(language, type) {
        return this.#boilerPlates.filter(boilerPlate => boilerPlate.language == language && boilerPlate.type == type);
    }

    /**
     * Read all boiler plates from disk
     */
    readBoilerPlates() {
        let configFile = this.boilerPlateConfigFile;
        if (this.fileSystem.existsSync(configFile)) {
            let json = this.fileSystem.readFileSync(configFile);
            let boilerPlatesAsObjects = JSON.parse(json);
            let boilerPlates = [];
            boilerPlatesAsObjects.forEach(boilerPlateObject => {
                let boilerPlate = new BoilerPlate(
                    boilerPlateObject.language,
                    boilerPlateObject.name,
                    boilerPlateObject.description,
                    boilerPlateObject.type,
                    boilerPlateObject.dependencies !== undefined? 
                        boilerPlateObject.dependencies.map(dep => dependencyFromJson(dep))
                        : [],
                    boilerPlateObject.path,
                    boilerPlateObject.pathsNeedingBinding || [],
                    boilerPlateObject.filesNeedingBinding || []
                );
                boilerPlates.push(boilerPlate);
            });

            this.#boilerPlates = boilerPlates;
        } else {

            this.#boilerPlates = [];
        }
    }

    /**
     * Get available boiler plates from GitHub
     * @returns {Promise<string[]>}
     */
    async getAvailableBoilerPlates() {
        let uri = 'https://api.github.com/orgs/dolittle-boilerplates/repos';
        return new Promise(resolve => {
            this.#httpWrapper.getJson(uri).then(json => {
                let result = JSON.parse(json);
                let urls = [];
                result.forEach(item => urls.push(item.name));
                resolve(urls);
            });
        });
    }

    /**
     * Update any existing boiler plates on disk
     * @returns {Promise<number>} number of updated folders
     */
    async updateBoilerPlatesOnDisk() {
        return new Promise(async resolve => {
            let folders = this.#folders.getFoldersIn(this.boilerPlateLocation);
            let updateCount = folders.length;

            if (updateCount === 0) resolve(0);
            folders.forEach(folder => {
                this.#logger.info(`Update boiler plate in '${folder}'`);
                this.#git.forFolder(folder).pull().exec(() => {
                    if (--updateCount === 0) resolve(folders.length);
                });
            });
        });
    }

    /**
     * Update boiler plates.
     * This will update any existing and download any new ones.
     * @returns {Promise<void>}
     */
    async update() {
        this.#logger.info('Updating all boiler plates');
        let promise = new Promise(async resolve => {
            let clonedNewRepos = false;
            const updatedCount = await this.updateBoilerPlatesOnDisk();
            let names = await this.getAvailableBoilerPlates();
            
            let cloneCount = 0;
            names.forEach(name => {
                let folderName = path.join(this.boilerPlateLocation, name);
                
                if (!this.fileSystem.existsSync(folderName)) {
                    clonedNewRepos = true;
                    let url = `https://github.com/dolittle-boilerplates/${name}.git`;
                    this.#logger.info(`Getting boilerplate not on disk from '${url}'`);
                    
                    cloneCount++;
                    
                    this.#git
                        .silent(false)
                        .clone(url, folderName, { '--recursive': null })
                        .exec(() => {
                            
                            if (--cloneCount == 0) {
                                this.updateConfiguration();
                                resolve();
                            }
                        });
                }
            });
            if (!clonedNewRepos && updatedCount > 0) {
                this.updateConfiguration();
                resolve();
            }
        });
        return promise;
    }

    /**
     * Update configuration file on disk
     */
    async updateConfiguration() {
        this.#logger.info(`Updating the ${this.boilerPlateConfigFile} configuration`);
        let self = this;
        let folders = this.#folders.getFoldersIn(this.boilerPlateLocation);
        let boilerPlates = [];
        folders.forEach(folder => {
            let boilerPlatesPaths = this.#folders.searchRecursive(folder, 'boilerplate.json');
            let contentFolder = path.join(folder, 'Content');
            
            boilerPlatesPaths.forEach(boilerPlatePath => {
                let boilerPlateObject = JSON.parse(this.fileSystem.readFileSync(boilerPlatePath, 'utf8'));
                if (boilerPlateObject.type != 'artifacts') {
                    let paths = this.#folders.getFoldersAndFilesRecursivelyIn(contentFolder);
                    paths = paths.filter(_ => {
                        let include = true;
                        binaryFiles.forEach(b => {
                            if (_.toLowerCase().indexOf(b) > 0) include = false;
                        });
                        return include;
                    });
                    let pathsNeedingBinding = paths.filter(_ => _.indexOf('{{') > 0).map(_ => _.substr(contentFolder.length + 1));

                    let filesNeedingBinding = [];
                    paths.forEach(_ => {
                        let stat = this.#fileSystem.statSync(_);
                        if (!stat.isDirectory()) {
                            let file = this.#fileSystem.readFileSync(_);
                            if (file.indexOf('{{') >= 0) {
                                filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                            }
                        }
                    });

                    boilerPlateObject.path = boilerPlatePath;
                    boilerPlateObject.pathsNeedingBinding = pathsNeedingBinding;
                    boilerPlateObject.filesNeedingBinding = filesNeedingBinding;
                }
                else {
                    boilerPlateObject.path = boilerPlatePath;
                    boilerPlateObject.pathsNeedingBinding = [];
                    boilerPlateObject.filesNeedingBinding = [];
                }

                let boilerPlate = new BoilerPlate(
                    boilerPlateObject.language || 'any',
                    boilerPlateObject.name,
                    boilerPlateObject.description,
                    boilerPlateObject.type,
                    boilerPlateObject.dependencies,
                    boilerPlateObject.path,
                    boilerPlateObject.pathsNeedingBinding ,
                    boilerPlateObject.filesNeedingBinding
                );
                boilerPlates.push(boilerPlate);
            });
        });
        let boilerPlatesAsObjects = boilerPlates.map(_ => _.toJson());
        let boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);
        this.fileSystem.writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);
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
     * Gets whether or not there are boiler plates installed
     * @returns {boolean} True if there are, false if not
     */
    get hasBoilerPlates() {
        return this.#boilerPlates.length > 0;
    }
}