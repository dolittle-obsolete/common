/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { fileSystem } from '@dolittle/tooling.common.files';
import { loggers } from '@dolittle/tooling.common.logging';
import { nodeModulesPath, toolingPackage, latestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import { LocalPluginsDiscoverer, IPluginLoader, PluginLoader, PluginsConfig, IPluginDiscoverers, PluginDiscoverers, IPlugins, Plugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, ProviderRegistrator } from './index';
import { ICanRegisterProviders, commandManager, providerRegistrators } from '@dolittle/tooling.common.commands';

export const pluginsConfig = new PluginsConfig(nodeModulesPath);
export const pluginLoader: IPluginLoader = new PluginLoader(pluginsConfig, fileSystem, loggers);

let localPluginsDiscoverer = new LocalPluginsDiscoverer(toolingPackage, pluginsConfig, nodeModulesPath, pluginLoader, fileSystem, loggers);

export const pluginDiscoverers: IPluginDiscoverers = new PluginDiscoverers([localPluginsDiscoverer])

export const plugins: IPlugins = new Plugins(pluginDiscoverers, pluginLoader, loggers);

export const onlinePluginsFinder = new OnlinePluginsFinder(latestCompatiblePackageFinder, loggers);

export const onlineDolittlePluginsFinder = new OnlineDolittlePluginsFinder(latestCompatiblePackageFinder, loggers);

let providerRegistrator: ICanRegisterProviders = new ProviderRegistrator(commandManager, pluginDiscoverers, latestCompatiblePackageFinder, plugins, onlinePluginsFinder, onlineDolittlePluginsFinder, fileSystem, loggers);

providerRegistrators.addRegistrators(providerRegistrator);