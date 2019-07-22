/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ToolingPackageDescriptor } from "./index";

/**
 * Defines a system that finds tooling packages with a given set of keywords
 *
 * @export
 * @interface ICanFindPackagesWithKeywords
 */
export interface ICanFindPackagesWithKeywords {

    /**
     * Finds tooling package descriptors online with additional keywords
     *
     * @param {string[]} additionalKeywords The additional keywords
     * @param {number} [limit]
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    find(keywords: string[], limit?: number): Promise<ToolingPackageDescriptor[]> 
}