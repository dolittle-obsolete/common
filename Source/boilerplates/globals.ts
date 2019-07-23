/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, commandManager, providerRegistrators } from '@dolittle/tooling.common.commands';
import { dependencyParsers } from '@dolittle/tooling.common.dependencies';
import { fileSystem, folders } from '@dolittle/tooling.common.files';
import { loggers } from '@dolittle/tooling.common.logging';
import { nodeModulesPath, toolingPackage, latestCompatiblePackageFinder, localPackageDiscoverers, packages, npmPackageDownloader, connectionChecker } from '@dolittle/tooling.common.packages';
import {
    BoilerplatesConfig, IBoilerplatesLoader, BoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplateDiscoverers, LocalBoilerplatesDiscoverer, IBoilerplateDiscoverers, 
    OnlineBoilerplatesDiscoverer, ITemplatesBoilerplates, TemplatesBoilerplates, IBoilerplateParsers, BoilerplateParsers, ICanParseBoilerplates, ContentBoilerplateParser, TemplatesBoilerplateParser,
    Boilerplates, IBoilerplates, OnlineDolittleBoilerplatesFinder, handlebars, IContentBoilerplates, ContentBoilerplates, ProjectConfig, IScriptRunner, ScriptRunner, BoilerplatesCommandGroupProvider, IBoilerplate, ProviderRegistrator
} from './index';

export const projectConfig = new ProjectConfig(nodeModulesPath);
export const boilerplatesConfig = new BoilerplatesConfig(nodeModulesPath); 

let instancesOfICanParseBoilerplates: ICanParseBoilerplates[] = [
    new ContentBoilerplateParser(dependencyParsers, folders, fileSystem),
    new TemplatesBoilerplateParser(dependencyParsers, folders, fileSystem)
];

export const boilerplateParsers: IBoilerplateParsers = new BoilerplateParsers(instancesOfICanParseBoilerplates);
export const boilerplatesLoader: IBoilerplatesLoader = new BoilerplatesLoader(boilerplateParsers, boilerplatesConfig, fileSystem, loggers);
let instancesOfICanDiscoverBoilerplates: ICanDiscoverBoilerplates[] = [
    new LocalBoilerplatesDiscoverer(boilerplatesConfig, boilerplatesLoader, localPackageDiscoverers, toolingPackage, loggers)
];

export const boilerplateDiscoverers: IBoilerplateDiscoverers = new BoilerplateDiscoverers(instancesOfICanDiscoverBoilerplates);

export const boilerplates: IBoilerplates = new Boilerplates(boilerplatesLoader);
export const templatesBoilerplates: ITemplatesBoilerplates = new TemplatesBoilerplates(boilerplatesLoader, folders, fileSystem, handlebars, loggers);
export const contentBoilerplates: IContentBoilerplates = new ContentBoilerplates(boilerplatesLoader, folders, fileSystem, loggers, handlebars);

export const onlineBoilerplatesFinder = new OnlineBoilerplatesDiscoverer(packages, loggers);

export const onlineDolittleBoilerplatesFinder = new OnlineDolittleBoilerplatesFinder(packages, loggers);

export const scriptRunner: IScriptRunner = new ScriptRunner();

export let providerRegistrator: ICanRegisterProviders = new ProviderRegistrator(commandManager, boilerplateDiscoverers, boilerplatesLoader, latestCompatiblePackageFinder, boilerplates, onlineBoilerplatesFinder, onlineDolittleBoilerplatesFinder, npmPackageDownloader, connectionChecker, fileSystem, loggers);

providerRegistrators.addRegistrators(providerRegistrator);