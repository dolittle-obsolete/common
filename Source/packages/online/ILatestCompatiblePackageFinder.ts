/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '../internal';

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
     * @param {string} packageName
     * @param {...string} additionalKeywords
     *
     * @returns {Promise<ToolingPackage | null>}
     */
    find(packageName: string, ...additionalKeywords: string[]): Promise<ToolingPackage | null>

}
