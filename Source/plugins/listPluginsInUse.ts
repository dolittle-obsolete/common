/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { OnStdCallback } from '@dolittle/tooling.common.packages';
import {  IPlugins } from './index';

/**
 * Lists the plugins used by the tooling
 *
 * @param {IPlugins} _plugins 
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onSuccess] Optional callback for dealing the text output when the operation was successful
 * @param {OnStdCallback} [onEachPlugin] Optional callback for dealing the text output for each plugin in the listing
 * @param {OnStdCallback} [onNoPlugins] Optional callback for dealing the text output when there are no plugins
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 * 
 */
export async function listPluginsInUse(_plugins: IPlugins, onStdOut?: OnStdCallback, onSuccess?: OnStdCallback, onEachPlugin?: OnStdCallback, onNoPlugins?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifSuccess = (data: string) => onSuccess? onSuccess(data) : {};
    let ifEachPlugin = (data: string) => onEachPlugin? onEachPlugin(data) : {};
    let ifNoPlugins = (data: string) => onNoPlugins? onNoPlugins(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    ifStdOut('Listing plugins in use:\n');
    try {
        let plugins = await _plugins.getPluginPackages();
        let numPlugins = plugins.length;
        if (numPlugins > 0) {
            ifSuccess(`There are ${numPlugins} in use`);
            plugins.forEach(plugin => {
                ifEachPlugin(
                    `${plugin.name} v${plugin.version}`);
            });
        }
        else ifNoPlugins('There are no plugins in use.');

    } catch(error) {
        ifStdErr(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}