/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import latestVersion from 'latest-version';
import semver from 'semver';
import { requireInternet } from '@dolittle/tooling.common.utilities';
import { OnStdCallback } from './OnStdCallback';

/**
 * Gets the latest version of a package from npmjs.com
 *
 * @export
 * @param {string} pkgName The name of the package
 * @param {OnStdCallback} [onStdOut] Optional callback for handling outgoing text 
 * @param {OnStdCallback} [onNoInternet] Optional callback for handling error messages 
 * @returns The latest version
 */
export async function getLatestVersionFromNpm(pkgName: string, onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    await requireInternet(onStdOut);
    if (onStdOut) onStdOut(`Getting latest version of ${pkgName}`);
    try {
        const version = await latestVersion(pkgName);
        return version;
    } catch (error) {
        if (onStdErr) onStdErr(`Failed to get the latest version of ${pkgName}. Error: ${error.message? error.message : error}`);
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