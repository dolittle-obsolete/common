/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'path';
import { BoundedContext } from './boilerPlates/boundedContexts/BoundedContext';
import { areas, determineDestination } from './helpers';
import * as FsExtra from 'fs-extra';
/**
 * Represents helpers for working with folders
 */
export class Folders
{
    private _fileSystem: typeof FsExtra;
    /**
     * Initializes a new instance of {folders}
     * @param {typeof FsExtra)} fileSystem 
     */
    constructor(fileSystem: typeof FsExtra) {
        this._fileSystem = fileSystem;
    }
    /**
     * Creates a feature from the current working directory. 
     *
     * @param {string} cwd To create feature from
     * @param {string} feature The feature to create. The string can be '.' separated to signify sub features (parentFeature.subFeature.subSubFeature)
     * @param {BoundedContext} boundedContext 
     * @param {*} dolittleConfig
     * @memberof Folders
     */
    createFeature(cwd: string, feature: string, boundedContext: BoundedContext, dolittleConfig: any) {
        areas.forEach(area => this.makeFolderIfNotExists(determineDestination(area, 'csharp', feature + '.', cwd, boundedContext.path, dolittleConfig).destination));
    }

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     * @returns {void}
     * @memberof Folders
     */
    copy(destination: string, source: string): void
    {
        destination = path.normalize(destination);
        source = path.normalize(source);
        this._fileSystem.copySync(source, destination);
    }

    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     * @returns {void}
     * @memberof Folders
     */
    makeFolderIfNotExists(folderPath: string): void
    {
        folderPath = path.normalize(folderPath);
        try {
            this._fileSystem.ensureDirSync(folderPath);
        } catch(err)
        {
            try {
                let shell = require('shelljs');
                shell.mkdir('-p', folderPath);
    
            } catch(err) {
                throw new Error('Could not create directory');
            }
        }
    }

    /**
     * Get top level folders in a given path
     * @param {string} folder 
     * @returns {string[]}
     * @memberof Folders
     */
    getFoldersIn(folder: string): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results.push(actualPath);
            }
        }
        return results;
    }

    /**
     * Get top level folders in a given path
     * @param {string} folder path 
     * @param {RegExp} regularExp
     * @returns {string[]} folder paths
     * @memberof Folders
     */
    getFoldersInRegex(folder: string, regularExp: RegExp): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            let regexMatch = path.parse(actualPath).name.match(regularExp);
            if (stat.isDirectory() && regexMatch && regexMatch.length > 0) {
                results.push(actualPath);
            }
        }
        return results;
    }

    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    getFilesRecursivelyIn(folder: string): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);

            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                results.push(actualPath);
            }
        }
        return results;
    }

    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {string[]} templateFileNames The template file names
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    getArtifactTemplateFilesRecursivelyIn(folder: string, templateFileNames: string[]): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                const filename = path.basename(actualPath);
                if (templateFileNames.includes(filename)) {
                    results.push(actualPath);
                }
            }
        }
        return results;
    }

    /**
     * Get all folders and files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files and folders
     * @memberof Folders
     */
    getFoldersAndFilesRecursivelyIn(folder: string): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
        let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            
            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            results.push(actualPath);
        }
        return results;
    }

    /**
     * Search for a specific file pattern within a folder
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    searchFolder(folder: string, pattern: string): string[] {
        folder = path.normalize(folder);
        let results: string[] = [];

        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        }

        return results;
    }
    /**
     * Search for a specific file pattern within a folder with regex
     * @param {string} folder Folder to search from
     * @param {RegExp} regularExp The regex pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    searchFolderRegex(folder: string, regularExp: RegExp): string[] {
        folder = path.normalize(folder);
        var results: string[] = [];
        
        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            dirInner = path.resolve(folder, dirInner);
            let regexMatch = dirInner.match(regularExp);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        }

        return results;
    }
    /**
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]} The paths of the matching files
     * @memberof Folders
     */
    searchRecursive(folder: string, pattern: string): string[] {
        folder = path.normalize(folder);
        var results: string[] = [];

        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(this.searchRecursive(dirInner, pattern));
            }

            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        }

        return results;
    }
    /**
     * Search for a specific file with regular expression, recursively
     * @param {string} folder to search from
     * @param {string} regularExp Pattern of the files to look for
     * @returns {string[]} the paths of the matching files
     * @memberof Folders
     */
    searchRecursiveRegex(folder: string, regularExp: RegExp | string): string[] {
        folder = path.normalize(folder);
        
        var results: string[] = [];

        let dirs = this._fileSystem.readdirSync(folder);
        for (let dirInner of dirs) {
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(this.searchRecursiveRegex(dirInner, regularExp));
            }
            let regexMatch = dirInner.match(regularExp);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        }

        return results;
    }
    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string[]} paths
     * @memberof Folders
     */
    getNearestDirsSearchingUpwards(folder: string, regularExp: RegExp): string[] {
        folder = path.normalize(folder);
        let results = [];
        while (this.isNotEmptyFolder(folder)) {
            let folders = this.getFoldersInRegex(folder, regularExp);
            if (folders.length > 0)
                results.push(...folders);
            folder = path.join(folder, '../');
            if (results.length > 0)
                break;
        }
        return results;
    }
    /**
     * Gets the path of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string} path
     * @memberof Folders
     */
    getNearestFileSearchingUpwards(folder: string, regularExp: RegExp): string {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder))
        {
            let results = this.searchFolderRegex(folder, regularExp); 
            if (results.length >= 1)
                return results[0];
            folder = path.join(folder, '../');
        }
        return '';
    }
    /**
     * Whether or not the folder at path 'folder' is empty or not
     *
     * @param {string} folder
     * @returns {boolean}
     * @memberof Folders
     */
    isNotEmptyFolder(folder: string): boolean {
        return folder !== null && folder !== '' && folder !== path.sep; 
    }
    
}
