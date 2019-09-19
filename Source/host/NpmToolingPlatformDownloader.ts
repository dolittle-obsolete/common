/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanDownloadToolingPlatform } from "./internal";
import spawn from 'cross-spawn';
import semver from 'semver';
/**
 * Represents an implementation of {ICanDownloadToolingPlatform}
 *
 * @export
 * @class NpmToolingPlatformDownloader
 */
export class NpmToolingPlatformDownloader implements ICanDownloadToolingPlatform {
    
    /**
     * Instantiates an instance of {NpmToolingPlatformDownloader.}
     * @param {string[]} _toolingPackages
     */
    constructor(private _toolingPackages: string[]) {}

    async download(toolingPackage: {version: string}) {
        let child = spawn.sync('npm', ['i', '-g', ...this._toolingPackages.map(_ => `${_}@^${semver.major(toolingPackage.version)}.0.0`)], {cwd: process.cwd(), stdio: 'inherit'}); 
        if (child.error) throw child.error;
        if (child.status !== 0) throw new Error(`Could not download tooling platform version ${semver.major(toolingPackage.version)}`);
        
    }
}