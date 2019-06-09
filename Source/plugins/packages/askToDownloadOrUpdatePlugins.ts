/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {requireInternet, downloadPackagesFromNpmSync, DownloadPackageInfo} from '@dolittle/tooling.common.packages';
import { PromptDependency, IDependencyResolvers, confirmUserInputType, chooseMultipleUserInputType } from '@dolittle/tooling.common.dependencies';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';

import { initPluginSystem, IPlugins } from '../index';

export type PluginPackageInfo = {
    name: string, version: string, latest?: string
}

/**
 * Performs the action that asks the user whether or not to download or update plugin packages 
 *
 * @param {PluginPackageInfo[]} pluginsPackages
 * 
 * @export
 */
export async function askToDownloadOrUpdatePlugins(pluginsPackages: PluginPackageInfo[], plugins: IPlugins, resolvers: IDependencyResolvers, 
    busyIndicator: IBusyIndicator) {
    await requireInternet(busyIndicator);
    if (pluginsPackages.length && pluginsPackages.length > 0) {
        const shouldDownload = await askToDownload(resolvers);
        if (shouldDownload) {
            let packagesToDownload = await askWhichPlugins(pluginsPackages, resolvers);
            if (packagesToDownload.length > 0) {
                await downloadPackagesFromNpmSync(packagesToDownload, busyIndicator);
                await initPluginSystem(plugins, busyIndicator);
            }
        }
    }
}

async function askToDownload(resolvers: IDependencyResolvers) {
    let dep = new PromptDependency('download', 'Asks whether to download plugins', confirmUserInputType, "Download latest plugins?");
    let answers = await resolvers.resolve({}, [dep]);
    return answers['download'];
}

async function askWhichPlugins(plugins: PluginPackageInfo[], resolvers: IDependencyResolvers): Promise<DownloadPackageInfo[]> {
    let downloadAllDep = new PromptDependency('downloadAll', 'Download all plugins?' , confirmUserInputType, 'Download all?');

    let answers = await resolvers.resolve({}, [downloadAllDep]);
    
    if (!answers['downloadAll']) {

        let choices = plugins.map(_ => new Object(
            {
                name: `${_.name}`, 
                value: { 
                    name: _.name,
                    version: _.latest || _.version
                }
            })
        );
        let choosePluginsDependency = new PromptDependency('plugins', 'Which plugins to download', chooseMultipleUserInputType, 'Choose plugins:', undefined, choices)
        answers = await resolvers.resolve({}, [choosePluginsDependency]);
        return answers['plugins'] as DownloadPackageInfo[];
    }
    return plugins.map(_ => new Object({name: _.name, version: _.latest || _.version})) as DownloadPackageInfo[];
}