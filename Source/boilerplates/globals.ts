/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from '@dolittle/tooling.common.configurations';
import { Guid, dolittleConfigDefault, folders, fileSystem, logger, nodeModulesPath } from '@dolittle/tooling.common.utilities';
import Handlebars from 'handlebars';

import {
    BoilerplatesConfig, IBoilerplatesCreator, BoilerplatesCreator, IBoilerplatesLoader, BoilerplatesLoader, ICanManageBoilerplates, BoilerplatesManager, 
    IBoilerplateManagers, BoilerplateManagers, ICanDiscoverBoilerplates, BoilerplateDiscoverers, BoilerplatesDiscoverer, IBoilerplateDiscoverers, 
    ICanFindOnlineBoilerplatePackages, OnlineBoilerplatesDiscoverer, IApplicationsManager, ApplicationsManager, IBoundedContextsManager, BoundedContextsManager, 
    IArtifactTemplateCreator, ArtifactTemplateCreator, IArtifactTemplatesManager, ArtifactTemplatesManager
} from './internal';

export * from './internal';

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

let instancesOfICanManageBoilerplates: ICanManageBoilerplates[] = [
    new BoilerplatesManager(boilerplatesLoader)
];
export let boilerplateManagers: IBoilerplateManagers = new BoilerplateManagers(instancesOfICanManageBoilerplates);

let instancesOfICanDiscoverBoilerplates: ICanDiscoverBoilerplates[] = [
    new BoilerplatesDiscoverer(boilerplatesConfig, nodeModulesPath, boilerplatesLoader, fileSystem, logger)
];
export let boilerplateDiscoverers: IBoilerplateDiscoverers = new BoilerplateDiscoverers(instancesOfICanDiscoverBoilerplates);

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
