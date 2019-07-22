/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ToolingPackageDescriptor, ToolingPackage} from './index';

/**
 * Defines a system that knows about tooling packages
 *
 * @export
 * @interface IPackages
 */
export interface IPackages {
    
    /**
     * Finds tooling packages with additional keywords 
     *
     * @param {string[]} keywords
     * @param {number} [limit]
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    withKeywords(keywords: string[], limit?: number): Promise<ToolingPackageDescriptor[]>

    /**
     * Finds tooling packages under a user
     *
     * @param {string} user
     * @param {(toolingPackage: ToolingPackage) => boolean} [check]
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    byUser(user: string, check?: (toolingPackage: ToolingPackage) => boolean): Promise<ToolingPackageDescriptor[]>

    /**
     * Finds the latest compatible tooling packages with additional keywords 
     *
     * @param {string[]} keywords
     * @param {number} [limit]
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    latestCompatibleWithKeywords(keywords: string[], limit?: number): Promise<ToolingPackage[]>

    /**
     * Finds the latest compatible tooling packages under a user
     *
     * @param {string} user
     * @param {(toolingPackage: ToolingPackage) => boolean} [check]
     * @returns {Promise<ToolingPackageDescriptor[]>}
     */
    latestCompatibleByUser(user: string, check?: (toolingPackage: ToolingPackage) => boolean): Promise<ToolingPackage[]>

    
} 