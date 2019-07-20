/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {WriteOptions, ReadOptions, Stats, WriteFileOptions, copy, CopyOptions, CopyOptionsSync, ensureDir, EnsureOptions} from 'fs-extra';

/**
 * Defines a low-level system for interacting with files
 *
 * @export
 * @interface IFileSystem
 */
export interface IFileSystem {

    /**
     * Reads a file as a json
     *
     * @param {string} file
     * @param {ReadOptions} [options]
     * @returns {Promise<any>}
     */
    readJson(file: string, options?: ReadOptions): Promise<any>

    /**
     * Reads a file as a json
     *
     * @param {string} file
     * @param {ReadOptions} [options]
     * @returns {*}
     */
    readJsonSync(file: string, options?: ReadOptions): any

    /**
     * Reads a file
     *
     * @param {string} file
     * @param {string} [encoding]
     * @returns {Promise<string>}
     */
    readFile(file: string, encoding?: string): Promise<string>

    /**
     * Reads a file 
     *
     * @param {string} file
     * @param {string} [encoding]
     * @returns {string}
     */
    readFileSync(file: string, encoding?: string): string

    /**
     * Reads the value of a symbolic link
     *
     * @param {string} file
     * @returns {Promise<string>}
     */
    readLink(file: string): Promise<string>

    /**
     * Reads the value of a symbolic link
     *
     * @param {string} file
     * @returns {string}
     */
    readLinkSync(file: string): string

    /**
     * Read a directory
     *
     * @param {string} path
     * @returns {Promise<string[]>}
     */
    readDirectory(path: string): Promise<string[]>

    /**
     * Read a directory
     *
     * @param {string} path
     * @returns {Promise<string[]>}
     */
    readDirectorySync(path: string): string[]
    
    /**
     * Writes a json object to file
     *
     * @param {string} file
     * @param {*} object
     * @param {WriteOptions} [options]
     * @returns {Promise<void>}
     */
    writeJson(file: string, object: any, options?: WriteOptions): Promise<void>

    /**
     * Writes a json object to file
     *
     * @param {string} file
     * @param {*} object
     * @param {WriteOptions} [options]
     */
    writeJsonSync(file: string, object: any, options?: WriteOptions): void
    
    /**
     * Writes to a file
     *
     * @param {string} file
     * @param {string} data
     * @param {WriteOptions} [options]
     * @returns {Promise<void>}
     */
    writeFile(file: string, data: string, options?: WriteFileOptions): Promise<void>

    /**
     * Writes to a file
     *
     * @param {string} file
     * @param {string} data
     * @param {WriteOptions} [options]
     */
    writeFileSync(file: string, data: string, options?: WriteFileOptions): void

    /**
     * Renames a file
     *
     * @param {string} oldPath
     * @param {string} newPath
     * @returns {Promise<void>}
     */
    rename(oldPath: string, newPath: string): Promise<void>

    /**
     * Renames a file
     *
     * @param {string} oldPath
     * @param {string} newPath
     */
    renameSync(oldPath: string, newPath: string): void

    /**
     * Copies from source to destination
     *
     * @param {string} source
     * @param {string} destination
     * @param {CopyOptions} [options]
     * @returns {Promise<void>}
     */
    copy(source: string, destination: string, options?: CopyOptions): Promise<void>
    
    /**
     * Copies from source to destination
     *
     * @param {string} source
     * @param {string} destination
     * @param {CopyOptionsSync} [options]
     */
    copySync(source: string, destination: string, options?: CopyOptionsSync): void

    /**
     * Checks whether a file exists
     *
     * @param {string} path
     * @returns {Promise<boolean>}
     */
    exists(path: string): Promise<boolean>

    /**
     * Checks whether a file exists
     *
     * @param {string} path
     * @returns {boolean}
     */
    existsSync(path: string): boolean

    /**
     * Ensures that a directory exists. If it doesn't it will attempt to create the directory
     *
     * @param {string} path
     * @param {EnsureOptions} [options]
     * @returns {Promise<void>}
     */
    ensureDirectory(path: string, options?: EnsureOptions): Promise<void>

    /**
     * Ensures that a directory exists. If it doesn't it will attempt to create the directory
     *
     * @param {string} path
     * @param {EnsureOptions} [options]
     */
    ensureDirectorySync(path: string, options?: EnsureOptions): void

    /**
     * Gets file status
     *
     * @param {string} path
     * @returns {Promise<Stats>}
     */
    stat(path: string): Promise<Stats>

    /**
     * Gets file status
     *
     * @param {string} path
     * @returns {Stats}
     */
    statSync(path: string): Stats

    /**
     * Gets file status. Does not dereference symbolic links
     *
     * @param {string} path
     * @returns {Promise<Stats>}
     */
    lstat(path: string): Promise<Stats>

    /**
     * Gets file status. Does not dereference symbolic links
     *
     * @param {string} path
     * @returns {Stats}
     */
    lstatSync(path: string): Stats
}
