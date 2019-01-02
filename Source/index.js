/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const filesystem = require('fs-extra');
import winston from 'winston';
import simpleGit from 'simple-git';

import {Folders} from './Folders';
import {HttpWrapper} from './HttpWrapper';
import {BoilerPlatesManager} from './boilerPlates/BoilerPlatesManager';
import {ConfigManager} from './configuration/ConfigManager';
import {ConfigParser} from './configuration/ConfigParser';
import { ArtifactsManager } from './artifacts/ArtifactsManager';
import { ApplicationsManager } from './applications/ApplicationsManager';
import { BoundedContextsManager } from './boundedContexts/BoundedContextsManager';
import { DependenciesManager } from './dependencies/DependenciesManager';

export {Guid} from './Guid';
export {Folders} from './Folders';
export {HttpWrapper} from './HttpWrapper';
export {Dependency} from './dependencies/Dependency';
export {BoilerPlate} from './boilerPlates/BoilerPlate';
export {BoilerPlatesManager} from './boilerPlates/BoilerPlatesManager';

export {ArtifactTemplate} from './artifacts/ArtifactTemplate';
export {Config} from './configuration/Config';
export {Cluster} from './configuration/Cluster';
export {ConfigManager} from './configuration/ConfigManager';
export {ConfigParser} from './configuration/ConfigParser';
export { ArtifactsManager } from './artifacts/ArtifactsManager';
export {ApplicationsManager} from './applications/ApplicationsManager';
export { DependenciesManager } from './dependencies/DependenciesManager';


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

export const dolittleConfig = require('rc')('dolittle', {
    csharp: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    }
});
export const folders = new Folders(filesystem);
export const boilerPlatesManager = new BoilerPlatesManager(configManager, httpWrapper, git, folders, filesystem, logger);
export const applicationsManager = new ApplicationsManager(boilerPlatesManager, logger);
export const artifactsManager = new ArtifactsManager(boilerPlatesManager, folders, filesystem, logger);
export const boundedContextManager = new BoundedContextsManager(boilerPlatesManager, logger);
export const dependenciesManager = new DependenciesManager(folders, filesystem, dolittleConfig, logger);

export const helpers = require('./helpers');
