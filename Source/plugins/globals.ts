/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commandManager } from '@dolittle/tooling.common.commands';
import { fileSystem } from '@dolittle/tooling.common.files';
import { logger } from '@dolittle/tooling.common.logging';
import { nodeModulesPath, toolingPackage, latestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import { LocalPluginsDiscoverer, IPluginLoader, PluginLoader, PluginsConfig, IPluginDiscoverers, PluginDiscoverers, IPlugins, Plugins, OnlinePluginsFinder, OnlineDolittlePluginsFinder, PluginsCommandGroupProvider } from './index';

export const pluginsConfig = new PluginsConfig(nodeModulesPath);
export const pluginLoader: IPluginLoader = new PluginLoader(pluginsConfig, fileSystem, logger);

let localPluginsDiscoverer = new LocalPluginsDiscoverer(toolingPackage, pluginsConfig, nodeModulesPath, pluginLoader, fileSystem, logger);

export const pluginDiscoverers: IPluginDiscoverers = new PluginDiscoverers([localPluginsDiscoverer])

export const plugins: IPlugins = new Plugins(pluginDiscoverers, pluginLoader, logger);

export const onlinePluginsFinder = new OnlinePluginsFinder(latestCompatiblePackageFinder, logger);

export const onlineDolittlePluginsFinder = new OnlineDolittlePluginsFinder(latestCompatiblePackageFinder, logger);

let pluginsCommandGroupProvider = new PluginsCommandGroupProvider(pluginDiscoverers, latestCompatiblePackageFinder, plugins, onlinePluginsFinder, onlineDolittlePluginsFinder, fileSystem, logger);

commandManager.registerDefaultProviders([], [pluginsCommandGroupProvider], []);