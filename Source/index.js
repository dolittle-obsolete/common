/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rc = require('rc');
export const filesystem = require('fs-extra');

import winston from 'winston';
import simpleGit from 'simple-git';
import Handlebars from 'handlebars';

import { ApplicationsManager } from './applications/ApplicationsManager';
import { ArtifactsManager } from './artifacts/ArtifactsManager';
import { BoilerPlatesManager } from './boilerPlates/BoilerPlatesManager';
import { BoundedContextsManager } from './boundedContexts/BoundedContextsManager';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { DependenciesManager } from './dependencies/DependenciesManager';
import { Folders } from './Folders';
import { HttpWrapper } from './HttpWrapper';
import {Guid} from './Guid';

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

export {Application} from './applications/Application';
export {ApplicationsManager} from './applications/ApplicationsManager';
export { ArtifactsManager } from './artifacts/ArtifactsManager';
export {ArtifactTemplate} from './artifacts/ArtifactTemplate';
export {BoilerPlate} from './boilerPlates/BoilerPlate';
export {BoilerPlatesManager} from './boilerPlates/BoilerPlatesManager';
export {BoundedContext} from './boundedContexts/BoundedContext';
export {BoundedContextsManager} from './boundedContexts/BoundedContextsManager';
export {Core} from './boundedContexts/Core'
export {Config} from './configuration/Config';
export {Cluster} from './configuration/Cluster';
export {ConfigManager} from './configuration/ConfigManager';
export {ConfigParser} from './configuration/ConfigParser';
export { DependenciesManager } from './dependencies/DependenciesManager';
export {Dependency} from './dependencies/Dependency';

export {Folders} from './Folders';
export {Guid} from './Guid';
export {HttpWrapper} from './HttpWrapper';

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

export var git = simpleGit(configManager.centralFolderLocation);

git.forFolder = (folder) => {
    return simpleGit(folder);
};

export const dolittleConfig = rc('dolittle', dolittleConfigDefault);

export const getDolittleConfig = () => rc('dolittle', dolittleConfigDefault);

export const folders = new Folders(filesystem);
setupHandlebars();
export const boilerPlatesManager = new BoilerPlatesManager(configManager, httpWrapper, git, folders, filesystem, logger, Handlebars);
export const applicationsManager = new ApplicationsManager(boilerPlatesManager, filesystem, logger);
export const artifactsManager = new ArtifactsManager(boilerPlatesManager, folders, filesystem, logger);
export const boundedContextsManager = new BoundedContextsManager(boilerPlatesManager, folders, filesystem, logger);
export const dependenciesManager = new DependenciesManager(folders, filesystem, dolittleConfig, logger);

export const helpers = require('./helpers');
