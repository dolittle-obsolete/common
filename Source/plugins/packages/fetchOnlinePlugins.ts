/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { requireInternet, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { OnlinePluginsFinder } from '../internal';

/**
 * Fetches the online plugins
 *
 * @param {OnlinePluginsFinder} onlinePluginsDiscoverer
 * @param {IBusyIndicator} busyIndicator
 * @param {string[]} [keywords=[]]
 * @param {number} [limit=250]
 * @returns
 */
export async function fetchOnlinePlugins(onlinePluginsDiscoverer: OnlinePluginsFinder, connectionChecker: IConnectionChecker, busyIndicator: IBusyIndicator, keywords: string[] = [], limit: number = 250) {
    await requireInternet(connectionChecker, busyIndicator);
    if (busyIndicator.isBusy) busyIndicator.stop();
    busyIndicator = busyIndicator.createNew().start('Getting plugins (this might take a while, depending on your internet connection): ');
    const plugins = await onlinePluginsDiscoverer.findLatest(keywords, limit)
        .then(plugins => {
            busyIndicator.succeed(`Found ${plugins.length} plugins`);
            return plugins;
        }).catch(error => {
            busyIndicator.fail(`An error occurred: ${error.message ? error.message : error}`);
            throw error;
        });
    return plugins;
}
