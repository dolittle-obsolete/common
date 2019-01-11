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

const boilerPlateFolder = 'boilerplates';

const binaryFiles = [
    '.jpg',
    '.png',
    '.obj',
    '.dll',
    '.bin',
    '.exe',
    '.ttf'
];

const dolittleBoilerplateFolders = [
    path.dirname(require.resolve('@dolittle/boilerplates.application/package.json')),
    path.dirname(require.resolve('@dolittle/boilerplates.artifact-templates/package.json')),
    path.dirname(require.resolve('@dolittle/boilerplates.bounded-context.csharp/package.json')),
    path.dirname(require.resolve('@dolittle/boilerplates.bounded-context.veracity.csharp/package.json'))
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
        this.#handlebars = handlebars;
        this.#logger = logger;

        this.#boilerPlates = undefined;
        this.#createLocalBoilerPlatesFolder();
        
        this.#warnIfUsingOldSystem();
    }
    /**
     * Gets base path for boiler plates
     * @returns {string} Base path of boiler plates
     */
    get localBoilerPlateLocation() {
        return path.join(this.#configManager.centralFolderLocation, boilerPlateFolder);
    }

    /**
     * Get all available boiler plates
     * @returns {BoilerPlate[]} Available boiler plates
     */
    get boilerPlates() {
        if (!this.#boilerPlates) this.readBoilerPlates();
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
     * Reads all boiler and sets the boilerPlates property
     */
    readBoilerPlates() {
        this.#boilerPlates = [];
        this.#boilerPlates.push(...this.readLocalBoilerPlates());
        this.#boilerPlates.push(...this.getBoilerPlatesFromDependencies());
    }
    /**
     * Reads all the local boilerplates found at ~/.dolittle/boilerplates
     */
    readLocalBoilerPlates() {
        if (this.fileSystem.existsSync(this.localBoilerPlateLocation)) {
            return this.readBoilerplateFromFolder(this.localBoilerPlateLocation);
        }
        return [];
    }
    /**
     * Reads and gets all the boilerplates from the installed dependencies
     *
     * @returns {BoilerPlate[]}
     * @memberof BoilerPlatesManager
     */
    getBoilerPlatesFromDependencies() {
        let boilerPlates = [];
        let folders = this.getBoilerPlateDependencies();
        folders.forEach(folder => {
            boilerPlates.push(...this.readBoilerplateFromFolder(folder));
        });
        return boilerPlates;
    }
    /**
     * Reads the contents of a folder and discovers boilerplates. Returns a list of boilerplates
     *
     * @param {string} folder The folder to search for boilerplates
     * @returns {BoilerPlate[]} A list of boilerplates
     * @memberof BoilerPlatesManager
     */
    readBoilerplateFromFolder(folder) {
        let boilerPlates = [];
        let boilerPlatesPaths = this.#folders.searchRecursive(folder, 'boilerplate.json');
        
        boilerPlatesPaths.forEach(boilerPlatePath => {
            let boilerPlateObject = JSON.parse(this.#fileSystem.readFileSync(boilerPlatePath, 'utf8'));
            boilerPlates.push(this.#parseBoilerPlate(boilerPlateObject, boilerPlatePath));
        });
        return boilerPlates;
    }
    /**
     * Gets the path of the folders of the dependencies containing boilerplates
     *
     * @returns {string[]} Paths to folders with boilerplates
     * @memberof BoilerPlatesManager
     */
    getBoilerPlateDependencies() {
        let folders = dolittleBoilerplateFolders;
        //TODO: Find folders containing boilerplates that are not from dolittle, but installed from npm
        // let modulesDir = path.resolve(folders[0], '..', '..');

        return folders;
    }
    /**
     * Installs the npm package with given package name 
     *
     * @param string packageName
     * @memberof BoilerPlatesManager
     */
    installBoilerplatePackage(packageName) {
        this.#logger.info(`Attempts to install a boilerplate package from npm '${packageName}'`);
        this.#logger.error('Not yet implemented');
        
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
        return this.#boilerPlates && this.#boilerPlates.length > 0;
    }

    #warnIfUsingOldSystem() {
        const filePath = path.join(this.#configManager.centralFolderLocation, 'boiler-plates.json');
        if (this.#fileSystem.existsSync(filePath)) {
            throw new Error(
`I see that there has been a long time since you've updated the dolittle tooling.

Please delete the file ${filePath} and all the boilerplates in ${this.localBoilerPlateLocation} that is not your own custom boilerplate.
`
            );
        }
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
                boilerPlateObject.dependencies.map(dep => dependencyFromJson(dep))
                : [],
            boilerPlateObject.path,
            boilerPlateObject.pathsNeedingBinding ,
            boilerPlateObject.filesNeedingBinding
        );
    }
    /**
     * Creates the local boilerplates folder in ~/.dolittle if not exists
     */
    #createLocalBoilerPlatesFolder() {
        this.#folders.makeFolderIfNotExists(this.localBoilerPlateLocation);
        require('fs-extra').writeFileSync(path.join(this.localBoilerPlateLocation, 'README'), 
`This is a folder where you can have your own boilerplates.

To be documented...`
        );
    }
}