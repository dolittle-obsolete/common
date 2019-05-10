/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ClusterConfig} from './ClusterConfig';
import path from 'path';
import * as FsExtra from 'fs-extra';
import {Logger as WinstonLogger} from 'winston';

const centralFolder = '~/.dolittle';
const configFile = 'config.json';

/**
 * Expand the given file paths possible reference to home folder
 * @param {string} filePath 
 */
function expandPath(filePath: string) {
    if (filePath[0] === '~') {
        return path.join(process.env.HOME || process.env.HOMEPATH || '', filePath.slice(1));
    }
    return filePath;
}

/**
 * Represents a manager for dealing with configurations
 *
 * @export
 * @class ConfigManager
 */
export class ConfigManager {
    private _fileSystem: typeof FsExtra;
    private _logger: WinstonLogger;
    private _isFirstRun = false;
    
    /**
     * Initializes a new instance of {ConfigManager}
     * @param {typeof FsExtra)} fileSystem
     * @param {ConfigParser} configParser
     * @param {WinstonLogger} logger
     */
    constructor(fileSystem: typeof FsExtra, logger: WinstonLogger) {
        this._fileSystem = fileSystem;
        this._logger = logger;  
        
        this.centralFolderLocation = expandPath(centralFolder);
        this.makeSureFolderExists();
        
    }
    /**
     * Gets the central folder location
     * @returns {string} The path to the central folder
     */
    readonly centralFolderLocation: string;

    /**
     * Gets the location of the config file
     * @returns {string} The path to the config file
     */
    get configFileLocation(): string {
        return path.join(this.centralFolderLocation, configFile);
    }

    /**
     * Gets whether or not this is a first run of the dolittle tool
     * @returns {boolean} True if it is, false if not
     */
    get isFirstRun(): boolean {return this._isFirstRun;}

    /**
     * Make sure the central folder exists
     */
    private makeSureFolderExists() {
        if( !this._fileSystem.existsSync(this.centralFolderLocation)) {
            this._isFirstRun = true;
            this._logger.info('Central Dolittle folder does not exist - creating it and setting up default configuration');
            try {
                this._fileSystem.ensureDirSync(this.centralFolderLocation);
            } catch(err)
            {
                try {
                    let shell = require('shelljs');
                    shell.mkdir('-p', this.centralFolderLocation);
        
                } catch(err)
                {
                    this._logger.error('Could not create .dolittle folder at root: ', err);
                    this._logger.info('Try creating this directory manually: ', this.centralFolderLocation);
                    throw new Error('Could not create .dolittle directory');
                }
            }
            let config = new ClusterConfig();
            this._fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
        } else {
            this._isFirstRun = false;
        }
    }
}