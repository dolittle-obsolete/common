/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { fileSystem } from '@dolittle/tooling.common.files';
import { logger } from '@dolittle/tooling.common.logging';
import { nodeModulesPath, toolingPackage } from '@dolittle/tooling.common.packages'
import { LocalPluginsDiscoverer, IPluginLoader, PluginLoader, PluginsConfig, IPluginDiscoverers, PluginDiscoverers, IPlugins, Plugins } from './index';

export const pluginsConfig = new PluginsConfig(nodeModulesPath);
export const pluginLoader: IPluginLoader = new PluginLoader(pluginsConfig, fileSystem, logger);
let localPluginsDiscoverer = new LocalPluginsDiscoverer(toolingPackage, pluginsConfig, nodeModulesPath, pluginLoader, fileSystem, logger);

export const pluginDiscoverers: IPluginDiscoverers = new PluginDiscoverers([localPluginsDiscoverer])

export const plugins: IPlugins = new Plugins(pluginDiscoverers, pluginLoader, logger);
