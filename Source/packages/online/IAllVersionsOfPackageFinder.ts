/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '../internal';

/**
 * Defines a system that can find all versions of a package
 *
 * @export
 * @interface IAllVersionsOfPackageFinder
 */
export interface IAllVersionsOfPackageFinder {
    
    /**
     * Gets all the tooling packages in an ascending order of the versions
     *
     * @param {string} packageName
     * 
     * @returns {Promise<ToolingPackage[]>}
     */
    find(packageName: string): Promise<ToolingPackage[]>

}
