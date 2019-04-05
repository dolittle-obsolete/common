/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rc = require('rc');
export const filesystem = require('fs-extra');

import winston from 'winston';
import Handlebars from 'handlebars';

import { ApplicationsManager } from './applications/ApplicationsManager';
import { ArtifactsManager } from './artifacts/ArtifactsManager';
import { BoilerplatesManager } from './boilerplates/BoilerplatesManager';
import { BoundedContextsManager } from './boundedContexts/BoundedContextsManager';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { DependenciesManager } from './dependencies/DependenciesManager';
import { Folders } from './Folders';
import { HttpWrapper } from './HttpWrapper';
import {Guid} from './Guid';
import { ProjectConfig } from './configuration/ProjectConfig';
import { BoilerplatesConfig } from './configuration/BoilerplatesConfig';

/**
 * Sets up the handlebars system with custom helpers
 */
function setupHandlebars() {
    Handlebars.registerHelper('createGuid', () => {
        return Guid.create();
    });
    Handlebars.registerHelper('dolittleConfigDefault', () => {
        let config = dolittleConfigDefault;
        if (config['_']) config['_'] = undefined;
        return JSON.stringify(config, null, 4).normalize();
    });
    Handlebars.registerHelper('addUniqueCSharpNamespace', objects => {
        return objects.map(_ => _.namespace).filter((v, i, a) => a.indexOf(v) === i).map(_ => `using ${_};`).join('\n');
    });
}

export const dolittleConfigDefault = {
    externalBoilerplates: [],
    any: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    },
    csharp: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    }
};


export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});
export const httpWrapper = new HttpWrapper(); 
export const configParser = new ConfigParser();
export const configManager = new ConfigManager(filesystem, configParser, logger);

export const dolittleConfig = rc('dolittle', dolittleConfigDefault);

export const getDolittleConfig = () => rc('dolittle', dolittleConfigDefault);

export const folders = new Folders(filesystem);

setupHandlebars();

let isInitialized = false;
/**
 * @type {BoilerplatesManager}
 */
let boilerplatesManager;
/**
 * @type {ApplicationsManager}
 */
let applicationsManager;
/**
 * @type {ArtifactsManager}
 */
let artifactsManager;
/**
 * @type {BoundedContextsManager}
 */
let boundedContextsManager;
/**
 * @type {DependenciesManager}
 */
let dependenciesManager;

/**
 * Initializes the tooling system and returns the managers
 */
export function getManagers() {
    if (!isInitialized) {
        isInitialized = true;
        boilerplatesManager = new BoilerplatesManager(configManager, httpWrapper, folders, filesystem, logger, Handlebars);
        applicationsManager = new ApplicationsManager(boilerplatesManager, filesystem, logger);
        artifactsManager = new ArtifactsManager(boilerplatesManager, logger);
        boundedContextsManager = new BoundedContextsManager(boilerplatesManager, folders, filesystem, logger);
        dependenciesManager = new DependenciesManager(folders, filesystem, dolittleConfig, logger);
    }
    return {
        boilerplatesManager,
        applicationsManager,
        artifactsManager,
        boundedContextsManager,
        dependenciesManager
    };
}
let npmRootSpawn = require('cross-spawn').sync('npm', ['root', '-g']);
if (npmRootSpawn.error) throw npmRootSpawn.error;

export const nodeModulesPath = npmRootSpawn.stdout.toString().replace(/\n$/, '');  
export const projectConfig = new ProjectConfig(nodeModulesPath);
export const boilerplatesConfig = new BoilerplatesConfig(nodeModulesPath); 
export const helpers = require('./helpers');
