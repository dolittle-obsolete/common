/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * Defines a system that can find the latest version of a package
 *
 * @export
 * @interface ICanFindLatestVersionOfPackage
 */
export interface ICanFindLatestVersionOfPackage {
    /**
     * Finds the latest version of a package
     *
     * @param {string} packageName
     * @returns {Promise<string>}
     */
    find(packageName: string): Promise<string>
}