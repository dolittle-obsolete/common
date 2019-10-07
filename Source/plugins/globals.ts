/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { fileSystem } from '@dolittle/tooling.common.files';
import { loggers } from '@dolittle/tooling.common.logging';
import { nodeModulesPath, toolingPackage, latestCompatiblePackageFinder, localPackageDiscoverers, packages, npmPackageDownloader, connectionChecker } from '@dolittle/tooling.common.packages';
import { ICanRegisterProviders, commandManager, providerRegistrators } from '@dolittle/tooling.common.commands';
import { LocalPluginsDiscoverer, IPluginLoader, PluginLoader, PluginsConfig, IPluginDiscoverers, PluginDiscoverers, IPlugins, Plugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, ProviderRegistrator } from './internal';

export const pluginsConfig = new PluginsConfig();
export const pluginLoader: IPluginLoader = new PluginLoader(pluginsConfig, fileSystem, loggers);

let localPluginsDiscoverer = new LocalPluginsDiscoverer(toolingPackage, pluginsConfig, pluginLoader, localPackageDiscoverers, fileSystem, loggers);

export const pluginDiscoverers: IPluginDiscoverers = new PluginDiscoverers([localPluginsDiscoverer], loggers)

export const plugins: IPlugins = new Plugins(pluginDiscoverers, pluginLoader, loggers);

export const onlinePluginsFinder = new OnlinePluginsFinder(packages, loggers);

export const onlineDolittlePluginsFinder = new OnlineDolittlePluginsFinder(packages, loggers);

let providerRegistrator: ICanRegisterProviders = new ProviderRegistrator(commandManager, pluginDiscoverers, pluginLoader, latestCompatiblePackageFinder, plugins, onlinePluginsFinder, onlineDolittlePluginsFinder, npmPackageDownloader, connectionChecker, fileSystem, loggers);

providerRegistrators.addRegistrators(providerRegistrator);
