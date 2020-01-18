/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import { ICanFindLocalToolingPlatform } from './internal';
/**
 * Represents an implementation of {I}
 *
 * @export
 * @class LocalNpmToolingPlatformFinder
 */
export class LocalNpmToolingPlatformFinder implements ICanFindLocalToolingPlatform {

    /**
     * Instantiates an instance of {LocalNpmToolingPlatformFinder}.
     * @param {string} _nodeModulesFolder
     */
    constructor(private _nodeModulesFolder: string, private _commonToolingPackages: string[]) {}

    async exists(toolingPackage: {version: string}) {
        const dolittleFolder = path.join(this._nodeModulesFolder, '@dolittle');
        let exists = true;
        const filesInFolder = await fs.readdir(dolittleFolder);
        const folders: string[] = [];
        await Promise.all(filesInFolder.map(async (file) => {
            file = path.join(dolittleFolder, file);
            const stat = await fs.stat(file);
            if (stat.isDirectory())
                folders.push(file);
        }));
        await Promise.all(this._commonToolingPackages.map(async (toolingPackageName) => {
            if (!exists) return;
            let hasPackage = false;
            for (const folder of folders) {
                if (await this.hasCorrectPackage(folder, toolingPackageName, toolingPackage.version)) {
                    hasPackage = true;
                    break;
                }
            }
            if (!hasPackage) exists = false;
        }));
        return exists;
    }

    private async hasCorrectPackage(packageFolder: string, packageName: string, version: string) {
        const packageJsonFile = path.join(packageFolder, 'package.json');
        if (await fs.pathExists(packageJsonFile)) {
            const packageJson = await fs.readJson(packageJsonFile);
            return packageJson.name === packageName && semver.major(version) === semver.major(packageJson.version);
        }
        return false;
    }
}
