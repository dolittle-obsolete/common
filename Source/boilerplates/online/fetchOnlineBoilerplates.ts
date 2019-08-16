/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { requireInternet, IConnectionChecker, ToolingPackage } from '@dolittle/tooling.common.packages';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { OnlineBoilerplatesDiscoverer } from '../index';

/**
 * Fetches the online boilerplates
 *
 * @param {OnlineBoilerplatesDiscoverer} onlineBoilerplatesDiscoverer
 * @param {string[]} [keywords=[]]
 * @param {number} [limit=250]
 * @returns {Promise<ToolingPackage[]>}
 */
export async function fetchOnlineBoilerplates(onlineBoilerplatesDiscoverer: OnlineBoilerplatesDiscoverer, connectionChecker: IConnectionChecker,
    busyIndicator: IBusyIndicator, keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
    await requireInternet(connectionChecker, busyIndicator);
    busyIndicator = busyIndicator.createNew().start('Getting boilerplates (this might take a while, depending on your internet connection): ');
    let boilerplates = await onlineBoilerplatesDiscoverer.findLatest(keywords, limit)
        .then(boilerplates => {
            busyIndicator.succeed(`Found ${boilerplates.length} boilerplates`);
            return boilerplates;
        }).catch(error => {
            busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}