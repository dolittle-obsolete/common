/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { OnStdCallback, ToolingPackage } from '@dolittle/tooling.common.packages';
import {FileSystem} from '@dolittle/tooling.common.files';
import path from 'path';
import { IPluginDiscoverers } from './index';

/**
 * Finds and gets the plugins installed on the local machine
 *
 * @param {IPluginDiscoverers} pluginDiscoverers
 * @param {FileSystem} filesystem
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onNoPlugins] Optional callback for dealing the text output when there are no plugins
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 * @returns A list of the package configurations for each plugin
 */

 
export async function listInstalledPlugins(pluginDiscoverers: IPluginDiscoverers, filesystem: FileSystem, onStdOut?: OnStdCallback, onNoPlugins?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifNoPlugins = (data: string) => onNoPlugins? onNoPlugins(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    ifStdOut('Getting installed plugins:\n');

    try {
        let paths = pluginDiscoverers.pluginPaths;
    
        let pluginPackages = paths.map(pluginPath => {
            let packageJson = filesystem.readJsonSync(path.join(pluginPath, 'package.json'));
            return packageJson as ToolingPackage;
        });
        let numPlugins = pluginPackages.length;
        if (numPlugins > 0) ifStdOut(`Found ${numPlugins} installed plugins`);
        else ifNoPlugins('Could not find any installed plugins.');
        
        return pluginPackages;
        
    } catch (error) {
        ifStdErr(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}