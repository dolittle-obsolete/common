/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, OnStdCallback } from '@dolittle/tooling.common.packages';
import { OnlineDolittlePluginsFinder } from '../index';

/**
 * Fetches the online dolittle Plugins
 *
 * @param {OnlineDolittlePluginsFinder} onlinePluginsDiscoverer
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @returns
 */
export async function fetchDolittlePlugins(onlinePluginsDiscoverer: OnlineDolittlePluginsFinder, onStdOut?: OnStdCallback, onStdErr?: OnStdCallback ) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    await requireInternet(onStdOut, onStdOut);
    ifStdOut('Getting dolittle plugins (this might take a while, depending on your internet connection): ');
    let plugins = await onlinePluginsDiscoverer.findLatest()
        .then(plugins => {
            ifStdOut(`Found ${plugins.length} dolittle plugins`);
            return plugins;
        }).catch(error => {
            ifStdErr(`An error occurred ${error.message? error.message : error}`);
            throw error;
        });
    return plugins;
}