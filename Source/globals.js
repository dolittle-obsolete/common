/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
import fs from 'fs-extra';
import winston from 'winston';
import simpleGit from 'simple-git';
import { Git } from 'simple-git';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { HttpWrapper } from './HttpWrapper';
import { Folders } from './Folders';
import { BoilerPlatesManager } from './boilerPlates/BoilerPlatesManager';
/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<globals, import('./configuration/ConfigManager').ConfigManager>}
 */
const _configManager = new WeakMap();
/**
 * @type {WeakMap<globals, import('./configuration/ConfigParser').ConfigParser>}
 */
const _configParser = new WeakMap();
/**
 * @type {WeakMap<globals, import('./boilerPlates/BoilerPlatesManager').BoilerPlatesManager>}
 */
const _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<globals, import('./Folders').Folders>}
 */
const _folders = new WeakMap();
/**
 * @type {WeakMap<globals, import('simple-git/src/git')>}
 */
const _git = new WeakMap();
/**
 * @type {WeakMap<globals, import('winston').Logger>}
 */
const _logger = new WeakMap();
/**
 * @type {WeakMap<globals, import('./HttpWrapper').HttpWrapper>}
 */
const _httpWrapper = new WeakMap();
/**
 * @type {WeakMap<globals, any>}
 */
const _dolittleConfig = new WeakMap();
/**
 * Common globals object
 */
class globals {
    /**
     * Perform initialization
     */
    constructor() {
        _logger.set(this, winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console()
            ]
        }));

        _httpWrapper.set(this, new HttpWrapper());
        
        _configParser.set(this, new ConfigParser());
        _configManager.set(this, new ConfigManager(fs, this.configParser, this.logger));

        let git = simpleGit(this.configManager.centralFolderLocation);
        git.forFolder = (folder) => {
            return simpleGit(folder);
        };
        
        _dolittleConfig.set(this, require('rc')('dolittle', {
            csharp: {
                concepts: 'Concepts',
                domain: 'Domain',
                events: 'Events',
                read: 'Read'
            }
        }));
        _git.set(this, git);
        _folders.set(this, new Folders(fs));
        _boilerPlatesManager.set(this, new BoilerPlatesManager(this.configManager, this.httpWrapper, git, this.folders, fs, this.logger));
    }
    /**
     * Gets the filesystem
     *
     * @returns {import('fs-extra')}
     * @readonly
     * @memberof globals
     */
    get fileSystem() {
        return fs;
    }

    /**
     * Gets the {ConfigManager}
     * @returns {import('./configuration/ConfigManager').ConfigManager}
     */
    get configManager() {
        return _configManager.get(this);
        
    }

    /**
     * Gets the {ConfigParser}
     * @returns {import('./configuration/ConfigParser').ConfigParser}
     */
    get configParser() {
        return _configParser.get(this);
    }

    /**
     * Gets the {Folders}
     * @returns {import('./Folders').Folders}
     */
    get folders() {
        return _folders.get(this);
    }
    /**
     * Gets the {BoilerPlatesManager}
     * @returns {import('./boilerPlates/BoilerPlatesManager').BoilerPlatesManager}
     */
    get boilerPlatesManager() {
        return _boilerPlatesManager.get(this);
    }

    /**
     * Gets the {Git} system
     * @returns {import('simple-git/src/git')}
     */
    get git() {
        return _git.get(this);
    }

    /**
     * Gets the {winston} logger
     * @returns {import('winston').Logger}
     */
    get logger() {
        return _logger.get(this);
    }

    /**
     * Gets the {HttpWrapper}
     * @returns {import('./HttpWrapper').HttpWrapper}
     */
    get httpWrapper() {
        return _httpWrapper.get(this);
    }
    /**
     * Gets the dolittle rc config
     * @returns {any}
     */
    get dolittleConfig() {
        return _dolittleConfig.get(this);
    }

}

export default new globals();