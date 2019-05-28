/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import packageJson from 'package-json'
import { ILatestCompatibleBoilerplateFinder, boilerplatePackageIsCompatible } from "./index";

/**
 * Defines a system that's responsible for finding the latest compatible boilerplate of a package online
 *
 * @export
 * @class LatestCompatibleBoilerplateFinder
 * @implements 
 */
export class LatestCompatibleBoilerplateFinder implements ILatestCompatibleBoilerplateFinder {

    /**
     * Instantiates an instance of {LatestCompatibleBoilerplateFinder}.
     * @param {*} _toolingPackage
     */
    constructor(private _toolingPackage: any) {
        
    }
    /**
     * Gets the package.json of the latest compatible boilerplate with the given package name
     *
     * @param {string} boilerplatePackageName
     * @returns {Promise<BoilerplatePackage | null>}
     */
    async find(boilerplatePackageName: string) {
        let packageObj = await packageJson(boilerplatePackageName, {allVersions: true, fullMetadata: true});
        let versionsObj = packageObj.versions;
        
        for (let version of Object.keys(versionsObj).reverse()) {
            if (boilerplatePackageIsCompatible(<any>versionsObj[version], this._toolingPackage)) {
                return versionsObj[version];
            }
        } 
        return null;
    }

}