/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import packageJson from 'package-json';

import { ILatestCompatiblePackageFinder, packageIsCompatible } from "../index";

/**
 * Represents an implementation of {ILatestCompatiblePackageFinder}
 *
 * @export
 * @class LatestCompatiblePackageFinder
 * @implements 
 */
export class LatestCompatiblePackageFinder implements ILatestCompatiblePackageFinder {

    /**
     * Instantiates an instance of {LatestCompatibleBoilerplateFinder}.
     * @param {*} _toolingPackage
     */
    constructor(private _toolingPackage: any) {}

    /**
     * Gets the package.json of the latest compatible boilerplate with the given package name
     *
     * @param {string} boilerplatePackageName
     * @returns {Promise<BoilerplatePackage | null>}
     */
    async find(packageName: string, ...additionalKeywords: string[]) {
        let packageObj: packageJson.FullMetadata;
        try {
            packageObj = await packageJson(packageName, {allVersions: true, fullMetadata: true});
        } catch (error) {
            return null;
        }
        let versionsObj = packageObj.versions;
        
        for (let version of Object.keys(versionsObj).reverse()) {
            let packageObj = versionsObj[version];
            if (packageIsCompatible(<any>packageObj, this._toolingPackage)
                && additionalKeywords.every(key => packageObj.keywords!.includes(key))) {
                return versionsObj[version];
            }
        } 
        return null;
    }

}