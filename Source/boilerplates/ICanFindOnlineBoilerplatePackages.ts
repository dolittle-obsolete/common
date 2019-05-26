/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson } from "./internal";

/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @interface ICanFindOnlineBoilerplatePackages
 */
export interface ICanFindOnlineBoilerplatePackages {
    
    /**
     * Finds boilerplate packages online and and returns the package.json objects of the latest versions of the boilerplates packages compatible with the common tooling major version
     *
     * @param {string[]} [keywords] Additional keywords used in search
     * @param {number} [limit] The limit of boilerplates
     * @returns {Promise<BoilerplatePackageJson>}
     * @memberof ICanFindOnlineBoilerplatePackages
     */
    discoverLatestOnlineBoilerplates(keywords?: string[], limit?: number): Promise<BoilerplatePackageJson[]>


    /**
     * Gets the package.json of the latest compatible boilerplate with the given package name
     *
     * @param {string} boilerplatePackageName
     * @returns {Promise<BoilerplatePackageJson>}
     * @memberof ICanFindOnlineBoilerplatePackages
     */
    latestCompatibleBoilerplate(boilerplatePackageName: string): Promise<BoilerplatePackageJson>

    /**
     * Finds boilerplate packages online and and returns the package.json objects of the latest versions of the boilerplates packages compatible with the common tooling major version
     *
     * @returns A list of compatible packages
     * @returns {Promise<BoilerplatePackageJson>}
     * @memberof ICanFindOnlineBoilerplatePackages
     */
    discoverLatestOnlineDolittleBoilerplates(): Promise<BoilerplatePackageJson[]>

}