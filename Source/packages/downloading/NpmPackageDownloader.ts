/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import spawn from 'cross-spawn';
import { ICanDownloadPackages, DownloadPackageInfo } from "../index";

/**
 * Represents an implementation of {ICanDownloadPackages} that can download packages from npm
 *
 * @export
 * @class NpmPackageDownloader
 * @implements {ICanDownloadPackages}
 */
export class NpmPackageDownloader implements ICanDownloadPackages {
    
    async download(packages: DownloadPackageInfo[]) {
        await spawn('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'}); 
    }    
    downloadSync(packages: DownloadPackageInfo[]) {
        spawn.sync('npm', ['i', '-g', ...packages.map(_ => _.version? `${_.name}@${_.version}` : _.name)], {cwd: process.cwd(), stdio: 'inherit'});
    }

}
