/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {requireInternet, DownloadPackageInfo, IConnectionChecker, ICanDownloadPackages} from '@dolittle/tooling.common.packages';
import { PromptDependency, IDependencyResolvers, confirmUserInputType, chooseMultipleUserInputType } from '@dolittle/tooling.common.dependencies';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IBoilerplateDiscoverers, initBoilerplatesSystem, IBoilerplatesLoader } from '../index';

export type BoilerplatePackageInfo = {
    name: string, version: string, latest?: string
}

/**
 * Performs the action that asks the user whether or not to download or update boilerplate packages 
 *
 * @param {BoilerplatePackageInfo[]} boilerplates
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {IDependencyResolvers} resolvers
 * @param {IBusyIndicator} busyIndicator 
 * @export
 */
export async function askToDownloadOrUpdateBoilerplates(boilerplates: BoilerplatePackageInfo[], boilerplateDiscoverers: IBoilerplateDiscoverers, boilerplatesLoader: IBoilerplatesLoader, 
    resolvers: IDependencyResolvers, packageDownloader: ICanDownloadPackages, connectionChecker: IConnectionChecker, busyIndicator: IBusyIndicator) {
    await requireInternet(connectionChecker, busyIndicator);

    if (boilerplates.length && boilerplates.length > 0) {
        const shouldDownload = await askToDownload(resolvers);
        if (shouldDownload) {
            let packagesToDownload = await askWhichBoilerplates(boilerplates, resolvers);
            if (packagesToDownload.length > 0) {
                packageDownloader.downloadSync(packagesToDownload);
                await initBoilerplatesSystem(boilerplateDiscoverers, boilerplatesLoader, busyIndicator);
            }
        }
    }
}

async function askToDownload(resolvers: IDependencyResolvers) {
    let dep = new PromptDependency(
        'download', 
        'Asks whether to download boilerplates', 
        [],
        confirmUserInputType, 
        "Download latest boilerplates?"
    );
    let answers = await resolvers.resolve({}, [dep], []);
    return answers['download'];
}

async function askWhichBoilerplates(boilerplates: BoilerplatePackageInfo[], resolvers: IDependencyResolvers): Promise<DownloadPackageInfo[]> {
    let downloadAllDep = new PromptDependency(
        'downloadAll',
        'Download all boilerplates?',
        [],
        confirmUserInputType,
        'Download all?'
    );

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
        let chooseBoilerplatesDependency = new PromptDependency(
            'boilerplates',
            'Which boilerplates to download',
            [],
            chooseMultipleUserInputType,
            'Choose boilerplates:',
            undefined,
            choices
        );
        answers = await resolvers.resolve({}, [chooseBoilerplatesDependency]);
        return answers['boilerplates'] as DownloadPackageInfo[];
    }
    return boilerplates.map(_ => new Object({name: _.name, version: _.latest || _.version})) as DownloadPackageInfo[];
}