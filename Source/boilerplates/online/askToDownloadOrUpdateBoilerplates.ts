/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {requireInternet, OnStdCallback, downloadPackagesFromNpmSync, DownloadPackageInfo} from '@dolittle/tooling.common.packages';
import { PromptDependency, IDependencyResolvers, confirmUserInputType, chooseMultipleUserInputType } from '@dolittle/tooling.common.dependencies';
import { IBoilerplateDiscoverers, initBoilerplatesSystem } from '../index';

export type BoilerplatePackageInfo = {
    name: string, version: string, latest?: string
}

/**
 * Performs the action that asks the user whether or not to download or update boilerplate packages 
 *
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 * @param {BoilerplatePackageInfo[]} boilerplates
 */
export async function askToDownloadOrUpdateBoilerplates(boilerplates: BoilerplatePackageInfo[], boilerplateDiscoverers: IBoilerplateDiscoverers, resolvers: IDependencyResolvers, 
    onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    await requireInternet(onStdOut, onStdErr);
    if (boilerplates.length && boilerplates.length > 0) {
        const shouldDownload = await askToDownload(resolvers);
        if (shouldDownload) {
            let packagesToDownload = await askWhichBoilerplates(boilerplates, resolvers);
            if (packagesToDownload.length > 0) {
                await downloadPackagesFromNpmSync(packagesToDownload, onStdOut, onStdErr);
                await initBoilerplatesSystem(boilerplateDiscoverers, onStdOut, onStdErr);
            }
        }
    }
}

async function askToDownload(resolvers: IDependencyResolvers) {
    let dep = new PromptDependency('download', 'Asks whether to download boilerplates', confirmUserInputType, "Download latest boilerplates?");
    let answers = await resolvers.resolve({}, [dep]);
    return answers['download'];
}

async function askWhichBoilerplates(boilerplates: BoilerplatePackageInfo[], resolvers: IDependencyResolvers): Promise<DownloadPackageInfo[]> {
    let downloadAllDep = new PromptDependency('downloadAll', 'Download all boilerplates?' , confirmUserInputType, 'Download all?');

    let answers = await resolvers.resolve({}, [downloadAllDep]);
    
    if (!answers['downloadAll']) {

        let choices = boilerplates.map(_ => new Object(
            {
                name: `${_.name}`, 
                value: { 
                        name: _.name,
                        version: _.latest || _.version
                    }
            })
        );
        let chooseBoilerplatesDependency = new PromptDependency('boilerplates', 'Which boilerplates to download', chooseMultipleUserInputType, 'Choose boilerplates:', choices)
        answers = await resolvers.resolve({}, [chooseBoilerplatesDependency]);
        return answers['boilerplates'] as DownloadPackageInfo[];
    }
    return boilerplates.map(_ => new Object({name: _.name, version: _.latest || _.version})) as DownloadPackageInfo[];
}