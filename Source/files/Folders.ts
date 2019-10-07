/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'path';
import shell from 'shelljs'
import { IFolders, IFileSystem } from './internal';

/**
 *  A class that contains functions for working with folders
 */
export class Folders implements IFolders
{
    /**
     * Initializes a new instance of {folders}
     * @param {typeof FsExtra)} fileSystem 
     */
    constructor(private _fileSystem: IFileSystem) {}

    async copy(destination: string, source: string)
    {
        destination = path.normalize(destination);
        source = path.normalize(source);
        await this._fileSystem.copy(source, destination);
    }

    copySync(destination: string, source: string)
    {
        destination = path.normalize(destination);
        source = path.normalize(source);
        this._fileSystem.copySync(source, destination);
    }

    async makeFolderIfNotExists(folderPath: string)
    {
        folderPath = path.normalize(folderPath);
        try {
            await this._fileSystem.ensureDirectory(folderPath);
        } catch(err)
        {
            try {
                shell.mkdir('-p', folderPath);
            } catch(err) {
                throw new Error('Could not create directory');
            }
        }
    }

    makeFolderIfNotExistsSync(folderPath: string)
    {
        folderPath = path.normalize(folderPath);
        try {
            this._fileSystem.ensureDirectorySync(folderPath);
        } catch(err)
        {
            try {
                shell.mkdir('-p', folderPath);
            } catch(err) {
                throw new Error('Could not create directory');
            }
        }
    }

    async getFolders(folder: string, pattern?: RegExp){
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = await this._fileSystem.readDirectory(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = await this._fileSystem.stat(actualPath);
            if (stat.isDirectory()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    getFoldersSync(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readDirectorySync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    async getFiles(folder: string, pattern?: RegExp){
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = await this._fileSystem.readDirectory(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = await this._fileSystem.stat(actualPath);
            if (stat.isFile()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    getFilesSync(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readDirectorySync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            if (stat.isFile()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    async getFilesRecursively(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = await this._fileSystem.readDirectory(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = await this._fileSystem.stat(actualPath);

            if (stat.isDirectory()) {
                results = results.concat(await this.getFilesRecursively(actualPath, pattern));
            }
            if (stat.isFile()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    getFilesRecursivelySync(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readDirectorySync(folder);
        for (let dirInner of dirs) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);

            if (stat.isDirectory()) {
                results = results.concat(this.getFilesRecursivelySync(actualPath, pattern));
            }
            if (stat.isFile()) {
                if (pattern) {
                    let regexMatch = actualPath.match(pattern);
                    if (regexMatch && regexMatch.length > 0) results.push(actualPath);
                }
                else results.push(actualPath);
            }
        }
        return results;
    }

    async getFilesAndFoldersRecursively(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = await this._fileSystem.readDirectory(folder);
        for (let dirInner of dirs) {
        let actualPath = path.resolve(folder, dirInner);
            let stat = await this._fileSystem.stat(actualPath);
            
            if (stat.isDirectory()) {
                results = results.concat(await this.getFilesAndFoldersRecursively(actualPath, pattern));
            }
            if (pattern) {
                let regexMatch = actualPath.match(pattern);
                if (regexMatch && regexMatch.length > 0) results.push(actualPath);
            }
            else results.push(actualPath);
        }
        return results;
    }

    getFilesAndFoldersRecursivelySync(folder: string, pattern?: RegExp) {
        folder = path.normalize(folder);
        let results: string[] = [];
        let dirs = this._fileSystem.readDirectorySync(folder);
        for (let dirInner of dirs) {
        let actualPath = path.resolve(folder, dirInner);
            let stat = this._fileSystem.statSync(actualPath);
            
            if (stat.isDirectory()) {
                results = results.concat(this.getFilesAndFoldersRecursivelySync(actualPath, pattern));
            }
            if (pattern) {
                let regexMatch = actualPath.match(pattern);
                if (regexMatch && regexMatch.length > 0) results.push(actualPath);
            }
            else results.push(actualPath);
        }
        return results;
    }

    async getNearestDirectoriesSearchingUpwards(folder: string, pattern: RegExp) {
        folder = path.normalize(folder);
        let results = [];
        while (this.isNotEmptyFolder(folder)) {
            let folders = await this.getFolders(folder, pattern);
            if (folders.length > 0)
                results.push(...folders);
            folder = path.join(folder, '../');
            if (results.length > 0)
                break;
        }
        return results;
    }
    
    getNearestDirectoriesSearchingUpwardsSync(folder: string, pattern: RegExp) {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder)) {
            let folders = this.getFoldersSync(folder, pattern);
            if (folders.length > 0)
                return folders;
            folder = path.join(folder, '../');   
        }
        return [];
    }

    async getNearestFilesSearchingUpwards(folder: string, pattern: RegExp) {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder))
        {
            let files = await this.getFiles(folder, pattern); 
            if (files.length > 0)
                return files;
            folder = path.join(folder, '../');
        }
        return [];
    }

    getNearestFilesSearchingUpwardsSync(folder: string, pattern: RegExp) {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder))
        {
            let files = this.getFilesSync(folder, pattern); 
            if (files.length > 0)
                return files;
            folder = path.join(folder, '../');
        }
        return [];
    }
    
    private isNotEmptyFolder(folder: string): boolean {
        return folder !== null && folder !== '' && folder !== path.sep; 
    }
}
