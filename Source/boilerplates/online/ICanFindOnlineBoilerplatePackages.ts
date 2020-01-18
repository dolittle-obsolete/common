/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '@dolittle/tooling.common.packages';

/**
 * Defines a system that's responsible for finding boilerplates online
 *
 * @export
 * @interface ICanFindOnlineBoilerplatePackages
 */
export interface ICanFindOnlineBoilerplatePackages {

    /**
     * Finds boilerplate packages online and and returns the package.json objects of the latest versions of the boilerplates packages compatible with the tooling
     *
     * @param {string[]} [keywords] Additional keywords used in search
     * @param {number} [limit] The limit of boilerplates
     * @returns {Promise<ToolingPackage>}
     */
    findLatest(keywords?: string[], limit?: number): Promise<ToolingPackage[]>

}
