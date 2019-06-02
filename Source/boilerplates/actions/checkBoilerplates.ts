/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, OnStdCallback, ILatestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import {FileSystem} from '@dolittle/tooling.common.files';
import semver from 'semver';
import path from 'path';
import {IBoilerplateDiscoverers, boilerplatePackageKeyword } from '../index';

export type OutOfDatePackage = {
    name: string, version: string, latest: string
}
/**
 * Checks the versions of the installed boilerplates against what's found online. 
 *
 * @export
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {ILatestCompatiblePackageFinder} latestPackageFinder
 * @param {FileSystem} fileSystem
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output
 * @param {OnStdCallback} [onNoBoilerplates] Optional callback for dealing with the text output when there were no boilerplates found
 * @param {OnStdCallback} [onPackageUpgrade] Optional callback for dealing with the text output for each time there is a package that can be updated
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs
 * @returns
 */
export async function checkBoilerplates(boilerplateDiscoverers: IBoilerplateDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder,
    fileSystem: FileSystem, onStdOut?: OnStdCallback, onNoBoilerplates?: OnStdCallback, onPackageUpgrade?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifNoBoilerplates = (data: string) => onNoBoilerplates? onNoBoilerplates(data) : {};
    let ifPackageUpgrade = (data: string) => onPackageUpgrade? onPackageUpgrade(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    
    await requireInternet(onStdOut, onStdErr);
    ifStdOut('Checking versions:\n');
    let paths = boilerplateDiscoverers.boilerplatePaths;
    if (paths.length < 1) {
        ifNoBoilerplates('No boilerplates installed');
        return [];
    }
    let locallyInstalled: {name: string, version: string}[] = [];
    paths.map(filePath => fileSystem.readJsonSync(path.join(filePath, 'package.json'), {encoding: 'utf8'}))
        .forEach(pkg => {
            locallyInstalled.push({name: pkg.name, version: pkg.version});    
        });

    return new Promise(async (resolve) => {
        let outOfDatePackages: OutOfDatePackage[] = [];
        for (let pkg of locallyInstalled) {
            ifStdOut(`Checking ${pkg.name}`);
            await latestPackageFinder.find(pkg.name, boilerplatePackageKeyword)
                .then(packageJson => {
                    if (packageJson === null) ifStdErr(`'${pkg.name}' is not a boilerplate`);
                    else {
                        let latestVersion = packageJson.version;
                        if (semver.gt(latestVersion, pkg.version)) {
                            outOfDatePackages.push({name: pkg.name, version: pkg.version, latest: latestVersion});
                            ifPackageUpgrade(`${pkg.name}@${pkg.version} ==> ${latestVersion}`);
                        }
                    }
                }).catch(_ => ifStdErr(`Failed to fetch ${pkg.name}`));
        }
        resolve(outOfDatePackages);

    }).then(outOfDatePackages => {
        return outOfDatePackages;
    });
}