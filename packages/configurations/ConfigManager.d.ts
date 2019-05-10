import * as FsExtra from 'fs-extra';
import { Logger as WinstonLogger } from 'winston';
/**
 * Represents a manager for dealing with configurations
 *
 * @export
 * @class ConfigManager
 */
export declare class ConfigManager {
    private _fileSystem;
    private _logger;
    private _isFirstRun;
    /**
     * Initializes a new instance of {ConfigManager}
     * @param {typeof FsExtra)} fileSystem
     * @param {ConfigParser} configParser
     * @param {WinstonLogger} logger
     */
    constructor(fileSystem: typeof FsExtra, logger: WinstonLogger);
    /**
     * Gets the central folder location
     * @returns {string} The path to the central folder
     */
    readonly centralFolderLocation: string;
    /**
     * Gets the location of the config file
     * @returns {string} The path to the config file
     */
    readonly configFileLocation: string;
    /**
     * Gets whether or not this is a first run of the dolittle tool
     * @returns {boolean} True if it is, false if not
     */
    readonly isFirstRun: boolean;
    /**
     * Make sure the central folder exists
     */
    private makeSureFolderExists;
}
