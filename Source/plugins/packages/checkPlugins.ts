/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, ILatestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import {IFileSystem} from '@dolittle/tooling.common.files';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
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
 * @param {IFileSystem} fileSystem
 * @param {IBusyIndicator} busyIndicator
 * @returns
 */
export async function checkPlugins(pluginDiscoverers: IPluginDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder,
    fileSystem: IFileSystem, busyIndicator: IBusyIndicator) {
    await requireInternet(busyIndicator);
    busyIndicator = busyIndicator.createNew().start('Checking versions:\n')
    let paths = pluginDiscoverers.pluginPaths;
    if (paths.length < 1) {
        busyIndicator.info('No plugins installed');
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
            busyIndicator.text = (`Checking ${pkg.name}`);
            await latestPackageFinder.find(pkg.name, pluginPackageKeyword)
                .then(packageJson => {
                    if (packageJson === null) {
                        busyIndicator.fail(`'${pkg.name}' is not a Plugin`);
                        busyIndicator = busyIndicator.createNew().start();
                    }
                    else {
                        let latestVersion = packageJson.version;
                        if (semver.gt(latestVersion, pkg.version)) {
                            outOfDatePackages.push({name: pkg.name, version: pkg.version, latest: latestVersion});
                            busyIndicator.warn(`${pkg.name}@${pkg.version} ==> ${latestVersion}`);
                            busyIndicator = busyIndicator.createNew().start();
                        }
                    }
                }).catch(_ => {
                    busyIndicator.fail(`Failed to fetch ${pkg.name}`);
                    busyIndicator = busyIndicator.createNew().start();
                });
        }

        if (outOfDatePackages.length < 1) {
            busyIndicator.succeed('There are no out-of-date plugins');
        }
        resolve(outOfDatePackages);

    }).then(outOfDatePackages => {
        return outOfDatePackages;
    });
}