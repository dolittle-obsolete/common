/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { requireInternet, ILatestCompatiblePackageFinder, IConnectionChecker } from '@dolittle/tooling.common.packages';
import {IFileSystem} from '@dolittle/tooling.common.files';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import semver from 'semver';
import path from 'path';
import {IBoilerplateDiscoverers, boilerplatePackageKeyword } from '../internal';

export type OutOfDatePackage = {
    name: string, version: string, latest: string
}
/**
 * Checks the versions of the installed boilerplates against what's found online. 
 *
 * @export
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {ILatestCompatiblePackageFinder} latestPackageFinder
 * @param {IFileSystem} fileSystem
 * @param {IConnectionChecker} connectionChecker
 * @param {IBusyIndicator} busyIndicator
 */
export async function checkBoilerplates(boilerplateDiscoverers: IBoilerplateDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder,
    fileSystem: IFileSystem, connectionChecker: IConnectionChecker, busyIndicator: IBusyIndicator): Promise<OutOfDatePackage[]> {
    await requireInternet(connectionChecker, busyIndicator);
    busyIndicator = busyIndicator.createNew().start('Checking versions:\n');

    await boilerplateDiscoverers.discover();
    let paths = boilerplateDiscoverers.boilerplatePaths;
    if (paths.length < 1) {
        busyIndicator.info('No boilerplates installed');
        return [];
    }
    let locallyInstalled: {name: string, version: string}[] = [];
    await Promise.all(paths.map(async filePath => {
        let packageJson = await fileSystem.readJson(path.join(filePath, 'package.json'));
        locallyInstalled.push({name: packageJson.name, version: packageJson.version});
    }));

    let outOfDatePackages = await getOutOfDatePackages(locallyInstalled, latestPackageFinder, busyIndicator);
    return outOfDatePackages;
}

async function getOutOfDatePackages(locallyInstalledPackages: {name: string, version: string}[], latestPackageFinder: ILatestCompatiblePackageFinder, busyIndicator: IBusyIndicator) {
    let outOfDatePackages: OutOfDatePackage[] = [];
        for (let pkg of locallyInstalledPackages) {
            busyIndicator.text = `Checking ${pkg.name}`;
            await latestPackageFinder.find(pkg.name, boilerplatePackageKeyword)
                .then(packageJson => {
                    if (packageJson === null) {
                        busyIndicator.fail(`'${pkg.name}' is not a boilerplate`);
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
            busyIndicator.succeed('There are no out-of-date boilerplates');
        }
        return outOfDatePackages;
}