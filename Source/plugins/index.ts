/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { nodeModulesPath, fileSystem, logger } from '@dolittle/tooling.common.utilities';
import { LocalPluginsDiscoverer } from './LocalPluginsDiscoverer';
import { IPluginLoader } from './IPluginLoader';
import { PluginLoader } from './PluginLoader';
import { PluginsConfig } from './configurations';

export * from './configurations';

export * from './IPlugin'
export * from './ICanDiscoverPlugins'
export * from './IPluginLoader';
export * from './PluginPackageJson';
export * from './PluginModule';
export * from './IPluginDiscoverers';

export const pluginsConfig = new PluginsConfig(nodeModulesPath);
export const pluginLoader: IPluginLoader = new PluginLoader(pluginsConfig, fileSystem, logger);
export const localPluginsDiscoverer = new LocalPluginsDiscoverer(pluginsConfig, nodeModulesPath, pluginLoader, fileSystem, logger);

console.log(localPluginsDiscoverer.pluginPaths);