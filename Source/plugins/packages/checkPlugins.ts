/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, OnStdCallback, ILatestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import {FileSystem} from '@dolittle/tooling.common.files';
import semver from 'semver';
import path from 'path';
import {IPluginDiscoverers, pluginPackageKeyword } from '../index';

export type OutOfDatePackage = {
    name: string, version: string, latest: string
}
/**
 * Checks the versions of the installed plugins against what's found online. 
 *
 * @export
 * @param {IPluginDiscoverers} pluginsDiscoverers
 * @param {ILatestCompatiblePackageFinder} latestPackageFinder
 * @param {FileSystem} fileSystem
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output
 * @param {OnStdCallback} [onNoPlugins] Optional callback for dealing with the text output when there were no plugins found
 * @param {OnStdCallback} [onPackageUpgrade] Optional callback for dealing with the text output for each time there is a package that can be updated
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs
 * @returns
 */
export async function checkPlugins(pluginDiscoverers: IPluginDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder,
    fileSystem: FileSystem, onStdOut?: OnStdCallback, onNoPlugins?: OnStdCallback, onPackageUpgrade?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifNoPlugins = (data: string) => onNoPlugins? onNoPlugins(data) : {};
    let ifPackageUpgrade = (data: string) => onPackageUpgrade? onPackageUpgrade(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    
    await requireInternet(onStdOut, onStdErr);
    ifStdOut('Checking versions:\n');
    let paths = pluginDiscoverers.pluginPaths;
    if (paths.length < 1) {
        ifNoPlugins('No plugins installed');
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
            await latestPackageFinder.find(pkg.name, pluginPackageKeyword)
                .then(packageJson => {
                    if (packageJson === null) ifStdErr(`'${pkg.name}' is not a Plugin`);
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