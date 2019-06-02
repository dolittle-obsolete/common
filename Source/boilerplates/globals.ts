/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ProjectConfig } from '@dolittle/tooling.common.configurations';
import { dependencyParsers } from '@dolittle/tooling.common.dependencies';
import { nodeModulesPath, toolingPackage, latestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import { fileSystem, folders } from '@dolittle/tooling.common.files';
import { logger } from '@dolittle/tooling.common.logging';
import {handlebars} from './toolingHandlebars';
import {
    BoilerplatesConfig, IBoilerplatesLoader, BoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplateDiscoverers, LocalBoilerplatesDiscoverer, IBoilerplateDiscoverers, 
    OnlineBoilerplatesDiscoverer, IApplicationsManager, ApplicationsManager, IBoundedContextsManager, BoundedContextsManager, 
    IArtifactTemplates, TemplatesBoilerplates, IBoilerplateParsers, BoilerplateParsers, ICanParseBoilerplates, ContentBoilerplateParser, TemplatesBoilerplateParser,
    Boilerplates, IBoilerplates, OnlineDolittleBoilerplatesFinder
} from './index';

export const projectConfig = new ProjectConfig(nodeModulesPath);
export const boilerplatesConfig = new BoilerplatesConfig(nodeModulesPath); 

let instancesOfICanParseBoilerplates: ICanParseBoilerplates[] = [
    new ContentBoilerplateParser(dependencyParsers, folders, fileSystem),
    new TemplatesBoilerplateParser(dependencyParsers, folders, fileSystem)
];

export const boilerplateParsers: IBoilerplateParsers = new BoilerplateParsers(instancesOfICanParseBoilerplates);
export const boilerplatesLoader: IBoilerplatesLoader = new BoilerplatesLoader(boilerplateParsers, boilerplatesConfig, fileSystem, logger);
let instancesOfICanDiscoverBoilerplates: ICanDiscoverBoilerplates[] = [
    new LocalBoilerplatesDiscoverer(boilerplatesConfig, toolingPackage, nodeModulesPath, boilerplatesLoader, fileSystem, logger)
];

export const boilerplateDiscoverers: IBoilerplateDiscoverers = new BoilerplateDiscoverers(instancesOfICanDiscoverBoilerplates);

export const boilerplates: IBoilerplates = new Boilerplates(boilerplatesLoader, folders, fileSystem, logger, handlebars);

export const onlineBoilerplatesFinder = new OnlineBoilerplatesDiscoverer(latestCompatiblePackageFinder, logger);

export const onlineDolittleBoilerplatesFinder = new OnlineDolittleBoilerplatesFinder(latestCompatiblePackageFinder, logger);

export const applicationsManager: IApplicationsManager = new ApplicationsManager(boilerplates, fileSystem, logger);

export const artifactTemplates: IArtifactTemplates = new TemplatesBoilerplates(boilerplates, folders, fileSystem, Handlebars, logger);

export const boundedContextsManager: IBoundedContextsManager = new BoundedContextsManager(boilerplates, applicationsManager, folders, fileSystem, logger);

