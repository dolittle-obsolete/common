/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Guid, dolittleConfigDefault, folders, fileSystem, logger } from '@dolittle/tooling.common.utilities';
import Handlebars from 'handlebars';
import { BoilerplatesManager } from './BoilerplatesManager';
import { ICanManageBoilerplates } from './ICanManageBoilerplates';
import { IBoilerplatesLoader } from './IBoilerplatesLoader';
import { BoilerplatesLoader } from './BoilerplatesLoader';
import spawn from 'cross-spawn'; 
import { ProjectConfig } from '@dolittle/tooling.common.configurations';
import { BoilerplatesConfig } from './configurations';
import { ICanDiscoverBoilerplates } from './ICanDiscoverBoilerplates';
import { BoilerplatesDiscoverer } from './BoilerplatesDiscoverer';
import { ICanFindOnlineBoilerplatePackages } from './ICanFindOnlineBoilerplatePackages';
import { OnlineBoilerplatesDiscoverer } from './OnlineBoilerplatesDiscoverer';
import { IBoilerplatesCreator } from './IBoilerplatesCreator';
import { BoilerplatesCreator } from './BoilerPlatesCreator';
import { IBoundedContextsManager, BoundedContextsManager } from './boundedContexts';
import { IApplicationsManager, ApplicationsManager } from './applications';
import { IArtifactTemplateCreator, ArtifactTemplateCreator, IArtifactTemplatesManager, ArtifactTemplatesManager } from './artifacts';
import { BaseBoilerplate } from './BaseBoilerplate';
import { IBoilerplateManagers } from './IBoilerplateManagers';
import { BoilerplateManagers } from './BoilerplateManagers';

export * from './applications';
export * from './artifacts';
export * from './boundedContexts';
export * from './configurations';

export * from './ArtifactsBoilerplate';
export * from './BaseBoilerplate';
export * from './Boilerplate';
export * from './BoilerplatesCreator';
export * from './BoilerplatesDiscoverer';
export * from './BoilerplatesLoader';
export * from './BoilerplatesManager';
export * from './BoundedContextPackageJson';
export * from './ExpectedBoilerplateError';
export * from './IBoilerplatesCreator';
export * from './IBoilerplatesLoader';
export * from './ICanDiscoverBoilerplates';
export * from './ICanFindOnlineBoilerplatePackages';
export * from './ICanManageBoilerplates';
export * from './OnlineBoilerplatesDiscoverer';
export * from './Script';
export * from './ScriptFailedError';
export * from './Scripts'

/**
 * Sets up the handlebars system with custom helpers
 */
function setupHandlebars() {
    Handlebars.registerHelper('createGuid', () => {
        return Guid.create();
    });
    Handlebars.registerHelper('dolittleConfigDefault', () => {
        let config: any  = dolittleConfigDefault;
        if (config['_']) config['_'] = undefined;
        return JSON.stringify(config, null, 4).normalize();
    });
    Handlebars.registerHelper('addUniqueCSharpNamespace', objects => {
        return objects.map((_: any) => _.namespace).filter((v: any, i: any, a: { indexOf: (arg0: any) => void; }) =>  a.indexOf(v) === i)
                                                    .map((_: any) => `using ${_};`).join('\n');
    });
}
// Setup the boilerplates system with default configuration

setupHandlebars();



let npmRootSpawn = spawn.sync('npm', ['root', '-g']);
if (npmRootSpawn.error) throw npmRootSpawn.error;
export const nodeModulesPath = npmRootSpawn.stdout.toString().replace(/\n$/, '');

export const projectConfig = new ProjectConfig(nodeModulesPath);
export const boilerplatesConfig = new BoilerplatesConfig(nodeModulesPath); 


export let boilerplatesCreator: IBoilerplatesCreator = new BoilerplatesCreator(folders, fileSystem, logger, Handlebars);
/**
 * Sets the internal IBoilerplatesCreator
 *
 * @export
 * @param {IBoilerplatesCreator} creator
 */
export function setBoilerplatesCreator(creator: IBoilerplatesCreator) { boilerplatesCreator = creator; };

export let boilerplatesLoader: IBoilerplatesLoader = new BoilerplatesLoader(boilerplatesConfig, folders, fileSystem, logger);
/**
 * Sets the internal IBoilerplatesLoader
 *
 * @export
 * @param {IBoilerplatesLoader} loader
 */
export function setBoilerplatesLoader(loader: IBoilerplatesLoader) { boilerplatesLoader = loader; };

export let instancesOfICanManageBoilerplates: ICanManageBoilerplates[] = [
    new BoilerplatesManager(boilerplatesLoader)
];
export let boilerplateManagers: IBoilerplateManagers = new BoilerplateManagers(instancesOfICanManageBoilerplates);

export let boilerplatesDiscoverers: ICanDiscoverBoilerplates[] = [
    new BoilerplatesDiscoverer(boilerplatesConfig, nodeModulesPath, boilerplatesLoader, fileSystem, logger)
];
export let onlineBoilerplateFinders: ICanFindOnlineBoilerplatePackages[] = [
    new OnlineBoilerplatesDiscoverer(logger)
]; 

export let applicationsManager: IApplicationsManager = new ApplicationsManager(boilerplateManagers, boilerplatesCreator, fileSystem, logger);
/**
 * Sets the internal IApplicationsManager
 *
 * @export
 * @param {IApplicationsManager} manager
 */
export function setApplicationsManager(manager: IApplicationsManager) { applicationsManager = manager; };

export let boundedContextsManager: IBoundedContextsManager = new BoundedContextsManager(boilerplateManagers, boilerplatesCreator, applicationsManager, folders, fileSystem, logger);
/**
 * Sets the internal IBoundedContextsManager
 *
 * @export
 * @param {IBoundedContextsManager} manager
 */
export function setBoundedContextsManager(manager: IBoundedContextsManager) { boundedContextsManager = manager; };

export let artifactTemplateCreator: IArtifactTemplateCreator = new ArtifactTemplateCreator(folders, fileSystem, logger, Handlebars);
/**
 * Sets the internal IArtifactTemplateCreator
 *
 * @export
 * @param {IArtifactTemplateCreator} creator
 */
export function setArtifactTemplateCreator(creator: IArtifactTemplateCreator) { artifactTemplateCreator = creator; };

export let artifactTemplatesManager: IArtifactTemplatesManager = new ArtifactTemplatesManager(boilerplateManagers, artifactTemplateCreator, logger);
/**
 * Sets the internal IArtifactTemplatesManager
 *
 * @export
 * @param {IArtifactTemplatesManager} manager
 */
export function setArtifactTemplatesCreator(manager: IArtifactTemplatesManager) { artifactTemplatesManager = manager; };

/**
 * Discovers all boilerplates using all instances of ICanDiscoverBoilerplates
 *
 * @export
 */
export function discoverAllBoilerplates() { boilerplatesDiscoverers.forEach(_ => _.discover()); }