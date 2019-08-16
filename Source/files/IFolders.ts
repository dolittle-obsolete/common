/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines high-level functionalities when interacting with folders in a file system
 *
 * @export
 * @interface IFolders
 */
export interface IFolders {
    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     * @returns {Promise<void>}
     */
    copy(destination: string, source: string): Promise<void>

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     * @returns {void}
     */
    copySync(destination: string, source: string): void


    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     * @returns {Promise<void>}
     */
    makeFolderIfNotExists(folderPath: string): Promise<void>


    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     * @returns {void}
     */
    makeFolderIfNotExistsSync(folderPath: string): void

    /**
     * Get top level folders in a given path
     * @param {string} folder The directory to search
     * @param {RegExp} [pattern] The matching pattern
     * @returns {Promise<string[]>}
     */
    getFolders(folder: string, pattern?: RegExp): Promise<string[]>
    
    /**
     * Get top level folders in a given path
     * @param {string} folder The directory to search
     * @param {RegExp} [pattern] The matching pattern
     * @returns {string[]}
     */
    getFoldersSync(folder: string, pattern?: RegExp): string[]

    /**
     * Get top level files in a given path
     * @param {string} folder The directory to search
     * @param {RegExp} [pattern] The matching pattern
     * @returns {Promise<string[]>}
     */
    getFiles(folder: string, pattern?: RegExp): Promise<string[]>
    
    /**
     * Get top level files in a given path
     * @param {string} folder The directory to search
     * @param {RegExp} [pattern] The matching pattern
     * @returns {string[]}
     */
    getFilesSync(folder: string, pattern?: RegExp): string[]

    /**
     * Get all files within a folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {RegExp} [pattern] The matching pattern
     * @returns {Promise<string[]>}
     */
    getFilesRecursively(folder: string, pattern?: RegExp): Promise<string[]>
    
    /**
     * Get all files within a folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {RegExp} [pattern] The matching pattern
     * @returns {string[]}
     */
    getFilesRecursivelySync(folder: string, pattern?: RegExp): string[]

    /**
     * Get all files folders within a folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {RegExp} [pattern] The matching pattern
     * @returns {Promise<string[]>}
     */
    getFilesAndFoldersRecursively(folder: string, pattern?: RegExp): Promise<string[]>
    
    /**
     * Get all files and folders within a folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {RegExp} [pattern] The matching pattern
     * @returns {string[]}
     */
    getFilesAndFoldersRecursivelySync(folder: string, pattern?: RegExp): string[]

    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} pattern
     * @returns {Promise<string[]>} 
     */
    getNearestDirectoriesSearchingUpwards(folder: string, pattern: RegExp): Promise<string[]>

    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} pattern
     * @returns {string[]} 
     */
    getNearestDirectoriesSearchingUpwardsSync(folder: string, pattern: RegExp): string[]

    /**
     * Gets the paths of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} pattern
     * @returns {Promise<string[]>} 
     */
    getNearestFilesSearchingUpwards(folder: string, pattern: RegExp): Promise<string[]>

    /**
     * Gets the paths of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} pattern
     * @returns {string[]} 
     */
    getNearestFilesSearchingUpwardsSync(folder: string, pattern: RegExp): string[]
}