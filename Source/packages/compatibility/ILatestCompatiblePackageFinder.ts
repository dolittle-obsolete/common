/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {FullVersion} from 'package-json';

/**
 * Defines a system that can find the latest version of a package compatible with the tooling
 *
 * @export
 * @interface ILatestCompatiblePackageFinder
 */
export interface ILatestCompatiblePackageFinder {
    
    /**
     * Gets the package.json of the latest version of the package compatible with the tooling
     *
     * @param {string} boilerplatePackageName
     * @param {...string} additionalKeywords
     * 
     * @returns {Promise<BoilerplatePackage | null>}
     */
    find(packageName: string, ...additionalKeywords: string[]): Promise<FullVersion | null>

}