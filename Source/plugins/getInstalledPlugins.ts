/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IPluginDiscoverers } from './index';

/**
 * Finds and gets the plugins installed on the local machine
 *
 * @param {IPluginDiscoverers} pluginDiscoverers
 * @param {IBusyIndicator} busyIndicator
 * @export
 */
export async function getInstalledPlugins(pluginDiscoverers: IPluginDiscoverers, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Getting installed plugins:\n');
    try {
        await pluginDiscoverers.discover();
        let pluginPackages = pluginDiscoverers.discovered;
        let numPlugins = pluginPackages.length;
        if (numPlugins > 0) busyIndicator.succeed(`Found ${numPlugins} installed plugins`);
        else busyIndicator.info('Could not find any installed plugins.');
        
        return pluginPackages;
        
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}
