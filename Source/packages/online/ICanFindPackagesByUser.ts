/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackageDescriptor, ToolingPackage } from '../internal';

/**
 * Defines a system that finds tooling packages by author / user
 *
 * @export
 * @interface ICanFindPackagesByUser
 */
export interface ICanFindPackagesByUser {

    /**
     * Finds tooling package descriptors online under a specific user
     *
     * @param {string} user
     * @param {(toolingPackage: ToolingPackage) => boolean} [check] An additional callback function for determining which packages to return based on the package.json
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    find(user: string, check?: (toolingPackage: ToolingPackage) => boolean): Promise<ToolingPackageDescriptor[]>
}
