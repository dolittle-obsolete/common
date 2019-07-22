/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import latestVersion = require("latest-version");
import { ICanFindLatestVersionOfPackage } from "./index";

/**
 * Represents an implementation of {ICanFindLatestVersionOfPackage} that finds latest version of npm package
 *
 * @export
 * @class LatestNpmPackageVersionFinder
 * @implements {ICanFindLatestVersionOfPackage}
 */
export class LatestNpmPackageVersionFinder implements ICanFindLatestVersionOfPackage {
    
    async find(packageName: string) {
        const version = await latestVersion(packageName);
        return version;
    }
}