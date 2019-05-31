/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import spawn from 'cross-spawn';
import {requireInternet, OnStdCallback, DownloadPackageInfo } from '../index';



/**
 * Downloads and installs packages from npmjs synchronously
 *
 * @param {DownloadPackageInfo} packages The packages to download
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 */
export async function downloadPackagesSync(packages: DownloadPackageInfo[], onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    await requireInternet(onStdOut, onStdErr);
    spawn.sync('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'});
                
}

/**
 * Downloads and installs packages from npmjs asynchronously
 *
 * @param {DownloadPackageInfo} packages The packages to download
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 */
export async function downloadPackages(packages: DownloadPackageInfo[], onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    await requireInternet(onStdOut, onStdErr);
    await spawn('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'});         
}
