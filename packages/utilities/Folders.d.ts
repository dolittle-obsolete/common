import * as FsExtra from 'fs-extra';
/**
 * Represents helpers for working with folders
 */
export declare class Folders {
    private _fileSystem;
    /**
     * Initializes a new instance of {folders}
     * @param {typeof FsExtra)} fileSystem
     */
    constructor(fileSystem: typeof FsExtra);
    /**
     * Creates a feature from the current working directory.
     *
     * @param {string} cwd To create feature from
     * @param {string} feature The feature to create. The string can be '.' separated to signify sub features (parentFeature.subFeature.subSubFeature)
     * @param {string} boundedContextPath
     * @param {*} dolittleConfig
     * @memberof Folders
     */
    createFeature(cwd: string, feature: string, boundedContextPath: string, dolittleConfig: any): void;
    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     * @returns {void}
     * @memberof Folders
     */
    copy(destination: string, source: string): void;
    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     * @returns {void}
     * @memberof Folders
     */
    makeFolderIfNotExists(folderPath: string): void;
    /**
     * Get top level folders in a given path
     * @param {string} folder
     * @returns {string[]}
     * @memberof Folders
     */
    getFoldersIn(folder: string): string[];
    /**
     * Get top level folders in a given path
     * @param {string} folder path
     * @param {RegExp} regularExp
     * @returns {string[]} folder paths
     * @memberof Folders
     */
    getFoldersInRegex(folder: string, regularExp: RegExp): string[];
    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    getFilesRecursivelyIn(folder: string): string[];
    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {string[]} templateFileNames The template file names
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    getArtifactTemplateFilesRecursivelyIn(folder: string, templateFileNames: string[]): string[];
    /**
     * Get all folders and files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files and folders
     * @memberof Folders
     */
    getFoldersAndFilesRecursivelyIn(folder: string): string[];
    /**
     * Search for a specific file pattern within a folder
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    searchFolder(folder: string, pattern: string): string[];
    /**
     * Search for a specific file pattern within a folder with regex
     * @param {string} folder Folder to search from
     * @param {RegExp} regularExp The regex pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    searchFolderRegex(folder: string, regularExp: RegExp): string[];
    /**
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]} The paths of the matching files
     * @memberof Folders
     */
    searchRecursive(folder: string, pattern: string): string[];
    /**
     * Search for a specific file with regular expression, recursively
     * @param {string} folder to search from
     * @param {string} regularExp Pattern of the files to look for
     * @returns {string[]} the paths of the matching files
     * @memberof Folders
     */
    searchRecursiveRegex(folder: string, regularExp: RegExp | string): string[];
    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string[]} paths
     * @memberof Folders
     */
    getNearestDirsSearchingUpwards(folder: string, regularExp: RegExp): string[];
    /**
     * Gets the path of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string} path
     * @memberof Folders
     */
    getNearestFileSearchingUpwards(folder: string, regularExp: RegExp): string;
    /**
     * Whether or not the folder at path 'folder' is empty or not
     *
     * @param {string} folder
     * @returns {boolean}
     * @memberof Folders
     */
    isNotEmptyFolder(folder: string): boolean;
}
