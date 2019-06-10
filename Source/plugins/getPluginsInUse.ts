/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import {  IPlugins } from './index';

/**
 * Gets the plugins used by the tooling
 *
 * @param {IPlugins} _plugins 
 * @param {IBusyIndicator} busyIndicator
 * @export
 * 
 */
export async function getPluginsInUse(_plugins: IPlugins, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Getting plugins in use:\n');
    try {
        let plugins = await _plugins.getPluginPackages();
        let numPlugins = plugins.length;
        if (numPlugins > 0) {
            busyIndicator.succeed(`There are ${numPlugins} in use`);
        }
        else busyIndicator.info('There are no plugins in use.');

        return plugins;

    } catch(error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}