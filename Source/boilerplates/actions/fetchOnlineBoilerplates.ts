/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, OnStdCallback } from '@dolittle/tooling.common.utilities';
import { OnlineBoilerplatesDiscoverer } from '../index';

/**
 * Fetches the online boilerplates
 *
 * @param {OnlineBoilerplatesDiscoverer} onlineBoilerplatesDiscoverer
 * @param {string[]} [keywords=[]]
 * @param {number} [limit=250]
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @returns
 */
export async function fetchOnlineBoilerplates(onlineBoilerplatesDiscoverer: OnlineBoilerplatesDiscoverer, keywords: string[] = [], limit: number = 250, 
    onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    await requireInternet(onStdOut, onStdErr);
    ifStdOut('Getting boilerplates (this might take a while, depending on your internet connection): ');
    let boilerplates = await onlineBoilerplatesDiscoverer.findLatest(keywords, limit)
        .then(boilerplates => {
            ifStdOut(`Found ${boilerplates.length} boilerplates`);
            return boilerplates;
        }).catch(error => {
            ifStdErr(`An error occurred: ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}