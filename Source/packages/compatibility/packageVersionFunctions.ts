/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import semver from 'semver';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { requireInternet, IConnectionChecker, ICanFindLatestVersionOfPackage } from '../index';


/**
 * Gets the latest version of a package
 *
 * @export
 * @param {string} pkgName
 * @param {ICanFindLatestVersionOfPackage} latestPackageVersionFinder
 * @param {IConnectionChecker} connectionChecker
 * @param {IBusyIndicator} busyIndicator
 * @returns 
 */
export async function getLatestVersion(pkgName: string, latestPackageVersionFinder: ICanFindLatestVersionOfPackage, connectionChecker: IConnectionChecker, busyIndicator: IBusyIndicator) {
    await requireInternet(connectionChecker, busyIndicator);
    busyIndicator = busyIndicator.createNew().start(`Getting latest version of ${pkgName}`);
    try {
        const version = await latestPackageVersionFinder.find(pkgName);
        busyIndicator.stop();
        return version;
    } catch (error) {
        busyIndicator.fail(`Failed to get the latest version of ${pkgName}. Error: ${error.message? error.message : error}`);
        throw error;
    }
}

/**
 * Checks whether or not the 'to' version is greater than 'from' 
 *
 * @export
 * @param {string} to
 * @param {string} from
 * @returns Whether to is a greater version than from
 */
export function isGreaterVersion(to: string, from: string) {
    return semver.gt(to, from);
}

/**
 * Checks whether the upgrade 'to' 'from' is a compatible upgrade, meaning that both versions have the same major version number but 'to' is an upgrade in minor or patch compared to 'from'
 *
 * @export
 * @param {string} to
 * @param {string} from
 * @returns
 */
export function isCompatibleUpgrade(to: string, from: string) {
    return semver.major(to) === semver.major(from) && semver.gt(to, from);
}