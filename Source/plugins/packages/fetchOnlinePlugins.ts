/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, OnStdCallback } from '@dolittle/tooling.common.packages';
import { OnlinePluginsFinder } from '../index';

/**
 * Fetches the online plugins
 *
 * @param {OnlinePluginsFinder} onlinePluginsDiscoverer
 * @param {string[]} [keywords=[]]
 * @param {number} [limit=250]
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @returns
 */
export async function fetchOnlinePlugins(onlinePluginsDiscoverer: OnlinePluginsFinder, keywords: string[] = [], limit: number = 250, 
    onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    await requireInternet(onStdOut, onStdErr);
    ifStdOut('Getting plugins (this might take a while, depending on your internet connection): ');
    let plugins = await onlinePluginsDiscoverer.findLatest(keywords, limit)
        .then(plugins => {
            ifStdOut(`Found ${plugins.length} plugins`);
            return plugins;
        }).catch(error => {
            ifStdErr(`An error occurred: ${error.message? error.message : error}`);
            throw error;
        });
    return plugins;
}