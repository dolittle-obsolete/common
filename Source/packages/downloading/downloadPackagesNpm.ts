/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import spawn from 'cross-spawn';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import {requireInternet, DownloadPackageInfo } from '../index';

/**
 * Downloads and installs packages from npmjs synchronously
 *
 * @param {DownloadPackageInfo} packages The packages to download
 * @param {IBusyIndicator} busyIndicator
 * @export
 */
export async function downloadPackagesFromNpmSync(packages: DownloadPackageInfo[], busyIndicator: IBusyIndicator) {
    await requireInternet(busyIndicator);
    spawn.sync('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'});
                
}

/**
 * Downloads and installs packages from npmjs asynchronously
 *
 * @param {DownloadPackageInfo} packages The packages to download
 * @param {IBusyIndicator} busyIndicator
 * @export
 */
export async function downloadPackagesFromNpm(packages: DownloadPackageInfo[], busyIndicator: IBusyIndicator) {
    await requireInternet(busyIndicator);
    await spawn('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'});         
}
