/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {requireInternet, OnStdCallback} from '@dolittle/tooling.common.utilities';
import spawn from 'cross-spawn';
import { IBoilerplateDiscoverers, initBoilerplatesSystem } from '../internal';
import { Dependency, IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

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
            let useYarn = false;
            let packageNames = await askWhichBoilerplates(boilerplates, resolvers);
            if (packageNames.length > 0) {
                if (!useYarn) 
                    spawn.sync('npm', ['i', '-g', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                else 
                    spawn.sync('yarn', ['global', 'add', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                await initBoilerplatesSystem(boilerplateDiscoverers, onStdOut, onStdErr);
            }
        }
    }
}
async function askToDownload(resolvers: IDependencyResolvers) {
    let dep = new Dependency('Asks whether to download boilerplates', 'download', 'userInput', undefined, 'chooseOne', ['Yes', "No"], "Download latest boilerplates?");
    let answers = await resolvers.resolve({}, [dep]);
    return answers['download'] === 'Yes';
}
async function askWhichBoilerplates(boilerplates: BoilerplatePackageInfo[], resolvers: IDependencyResolvers) {
    let downloadAllDep = new Dependency('Download all boilerplates?', 'downloadAll', 'userInput', undefined, 'chooseOne', ['Yes', 'No'], 'Download all?');

    let answers = await resolvers.resolve({}, [downloadAllDep]);
    
    if (answers['downloadAll'] !== 'Yes') {

        let choices = boilerplates.map(_ => new Object({name: `${_.name}`, value: `${_.name}@${_.latest? _.latest : _.version}`}));
        let chooseBoilerplatesDependency = new Dependency('Which boilerplates to download', 'boilerplates', 'userInput', undefined, 'chooseMultiple', choices, 'Choose boilerplates:')
        answers = await resolvers.resolve({}, [chooseBoilerplatesDependency]);
        return answers['boilerplates'];
    }
    return boilerplates.map(_ => `${_.name}@${_.latest || _.version}`);
}