/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Config} from './Config';
import path from 'path';

const centralFolder = '~/.dolittle';
const configFile = 'config.json';

/**
 * Expand the given filepaths possible reference to home folder
 * @param {string} filepath 
 */
function expandPath(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME||process.env.HOMEPATH, filepath.slice(1));
    }
    return filepath;
}



/**
 * Represents a manager for dealing with configurations
 *
 * @export
 * @class ConfigManager
 */
export class ConfigManager {
    #fileSystem;
    #configParser;
    #logger;
    #centralFolderLocation;
    #isFirstRun = false;
    /**
     * Initializes a new instance of {ConfigManager}
     * @param {import('fs-extra')} fileSystem
     * @param {ConfigParser} configParser
     * @param {import('winston').Logger} logger
     */
    constructor(fileSystem, configParser, logger) {
        this.#fileSystem = fileSystem;
        this.#configParser = configParser;
        this.#logger = logger;  
        
        this.#centralFolderLocation = expandPath(centralFolder);
        this.#makeSureFolderExists();
    }
    /**
     * Make sure the central folder exists
     */
    #makeSureFolderExists() {
        if( !this.#fileSystem.existsSync(this.#centralFolderLocation)) {
            this.#isFirstRun = true;
            this.#logger.info('Central Dolittle folder does not exist - creating it and setting up default configuration');
            try {
                this.#fileSystem.ensureDirSync(this.#centralFolderLocation);
            } catch(err)
            {
                try {
                    let shell = require('shelljs');
                    shell.mkdir('-p', this.#centralFolderLocation);
        
                } catch(err)
                {
                    this.#logger.error('Could not create .dolittle folder at root: ', err);
                    this.#logger.info('Try creating this directory manually: ', this.#centralFolderLocation);
                    throw new error('Could not create .dolittle directory');
                }
            }
            let config = new Config();
            this.#fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
        } else {
            this.#isFirstRun = false;
        }
    }

    /**
     * Gets the central folder location
     * @returns {string} The path to the central folder
     */
    get centralFolderLocation() {
        return this.#centralFolderLocation;
    }

    /**
     * Gets the location of the config file
     * @returns {string} The path to the config file
     */
    get configFileLocation() {
        return path.join(this.#centralFolderLocation, configFile);
    }

    /**
     * Gets whether or not this is a first run of the dolittle tool
     * @returns {boolean} True if it is, false if not
     */
    get isFirstRun() {
        return this.#isFirstRun;
    }
}