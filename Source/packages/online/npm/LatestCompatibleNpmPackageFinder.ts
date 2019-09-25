/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILatestCompatiblePackageFinder, packageIsCompatible, IAllVersionsOfPackageFinder } from "../../internal";

/**
 * Represents an implementation of {ILatestCompatiblePackageFinder} that finds latest compatible npm package
 *
 * @export
 * @class LatestCompatibleNpmPackageFinder
 * @implements 
 */
export class LatestCompatibleNpmPackageFinder implements ILatestCompatiblePackageFinder {

    /**
     * Instantiates an instance of {LatestCompatibleNpmPackageFinder}.
     * @param {IAllVersionsOfPackageFinder} _allVersionsOfPackageFinder
     * @param {*} _toolingPackage
     */
    constructor(private _allVersionsOfPackageFinder: IAllVersionsOfPackageFinder, private _toolingPackage: any) {}

    async find(packageName: string, ...additionalKeywords: string[]) {
        try {
            let allPackageVersions = await this._allVersionsOfPackageFinder.find(packageName);
        
            for (let packageObj of allPackageVersions.reverse()) {
                if (packageIsCompatible(packageObj, this._toolingPackage)
                    && additionalKeywords.every(key => packageObj.keywords!.includes(key))) {
                    return packageObj;
                }
            } 
            return null;
        } catch (error) {
            return null;
        }
        
    }

}
