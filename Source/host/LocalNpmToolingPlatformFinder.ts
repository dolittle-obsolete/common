/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import fs from 'fs-extra';
import path from 'path';
import { ICanFindLocalToolingPlatform } from "./internal";
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
        let dolittleFolder = path.join(this._nodeModulesFolder, '@dolittle');
        let exists = true;
        let filesInFolder = await fs.readdir(dolittleFolder);
        let folders: string[] = [];
        await Promise.all(filesInFolder.map(async (file) => {
            file = path.join(dolittleFolder, file);
            let stat = await fs.stat(file);
            if (stat.isDirectory())
                folders.push(file);
        }));
        await Promise.all(this._commonToolingPackages.map(async (toolingPackage) => {
            if (!exists) return;
            let hasPackage = false;
            for (let folder of folders) {
                if (await this.hasCorrectPackage(folder, toolingPackage)) {
                    hasPackage = true;
                    break;
                }
            }
            if (!hasPackage) exists = false;
        }));
        return exists;
    }

    private async hasCorrectPackage(packageFolder: string, packageName: string) {
        let packageJsonFile = path.join(packageFolder, 'package.json');
        if (await fs.pathExists(packageJsonFile)) {
            let packageJson = await fs.readJson(packageJsonFile);
            return packageJson.name === packageName;
        }
        return false;
    }
}