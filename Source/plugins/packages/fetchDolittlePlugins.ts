/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { requireInternet, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { OnlineDolittlePluginsFinder } from '../internal';

/**
 * Fetches the online dolittle Plugins
 *
 * @param {OnlineDolittlePluginsFinder} onlinePluginsDiscoverer
 * @param {IBusyIndicator} busyIndicator
 * @returns
 */
export async function fetchDolittlePlugins(onlinePluginsDiscoverer: OnlineDolittlePluginsFinder, connectionChecker: IConnectionChecker,busyIndicator: IBusyIndicator) {
    await requireInternet(connectionChecker, busyIndicator);
    busyIndicator = busyIndicator.createNew().start('Getting dolittle plugins (this might take a while, depending on your internet connection): ');
    let plugins = await onlinePluginsDiscoverer.findLatest()
        .then(plugins => {
            busyIndicator.succeed(`Found ${plugins.length} dolittle plugins`);
            return plugins;
        }).catch(error => {
            busyIndicator.fail(`An error occurred ${error.message? error.message : error}`);
            throw error;
        });
    return plugins;
}
