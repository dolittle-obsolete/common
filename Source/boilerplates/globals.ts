/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from '@dolittle/tooling.common.configurations';
import { Guid, dolittleConfigDefault, folders, fileSystem, logger, nodeModulesPath, toolingPackage } from '@dolittle/tooling.common.utilities';
import { dependencyParsers } from '@dolittle/tooling.common.dependencies';
import Handlebars from 'handlebars';

import {
    BoilerplatesConfig, IBoilerplatesLoader, BoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplateDiscoverers, LocalBoilerplatesDiscoverer, IBoilerplateDiscoverers, 
    OnlineBoilerplatesDiscoverer, IApplicationsManager, ApplicationsManager, IBoundedContextsManager, BoundedContextsManager, 
    IArtifactTemplates, ArtifactTemplates, IBoilerplateParsers, BoilerplateParsers, ICanParseBoilerplates, NonArtifactsBoilerplateParser, ArtifactsBoilerplateParser,
    Boilerplates, ILatestCompatibleBoilerplateFinder,LatestCompatibleBoilerplateFinder, IBoilerplates, OnlineDolittleBoilerplatesFinder
} from './index';

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
setupHandlebars();

export const projectConfig = new ProjectConfig(nodeModulesPath);
export const boilerplatesConfig = new BoilerplatesConfig(nodeModulesPath); 

let instancesOfICanParseBoilerplates: ICanParseBoilerplates[] = [
    new NonArtifactsBoilerplateParser(dependencyParsers, folders, fileSystem),
    new ArtifactsBoilerplateParser(dependencyParsers, folders, fileSystem)
];

export const boilerplateParsers: IBoilerplateParsers = new BoilerplateParsers(instancesOfICanParseBoilerplates);
export const boilerplatesLoader: IBoilerplatesLoader = new BoilerplatesLoader(boilerplateParsers, boilerplatesConfig, folders, fileSystem, logger);
let instancesOfICanDiscoverBoilerplates: ICanDiscoverBoilerplates[] = [
    new LocalBoilerplatesDiscoverer(boilerplatesConfig, toolingPackage, nodeModulesPath, boilerplatesLoader, fileSystem, logger)
];

export const boilerplateDiscoverers: IBoilerplateDiscoverers = new BoilerplateDiscoverers(instancesOfICanDiscoverBoilerplates);

export const boilerplates: IBoilerplates = new Boilerplates(boilerplatesLoader, folders, fileSystem, logger, Handlebars);

export const latestCompatibleBoilerplateFinder: ILatestCompatibleBoilerplateFinder = new LatestCompatibleBoilerplateFinder(toolingPackage);

export const onlineBoilerplatesFinder = new OnlineBoilerplatesDiscoverer(latestCompatibleBoilerplateFinder, logger);

export const onlineDolittleBoilerplatesFinder = new OnlineDolittleBoilerplatesFinder(latestCompatibleBoilerplateFinder, logger);

export const applicationsManager: IApplicationsManager = new ApplicationsManager(boilerplates, fileSystem, logger);

export const artifactTemplates: IArtifactTemplates = new ArtifactTemplates(boilerplates, folders, fileSystem, Handlebars, logger);

export const boundedContextsManager: IBoundedContextsManager = new BoundedContextsManager(boilerplates, applicationsManager, folders, fileSystem, logger);

