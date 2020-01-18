/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoveredToolingPackage, ICanDiscoverLocalPackages, ToolingPackage } from '../internal';

/**
 * Defines a system that knows about {ICanDiscoverLocalPackages} local package discoverers
 *
 * @export
 * @interface ICanDiscoverLocalPackages
 */
export interface ILocalPackageDiscoverers {

    /**
     * The instances of {ICanDiscoverLocalPackages}
     *
     * @type {ICanDiscoverLocalPackages[]}
     */
    readonly discoverers: ICanDiscoverLocalPackages[]

    /**
     * Discovers the locally installed tooling packages
     *
     * @param {string} [folder] The folder to start discovering from
     * @param {(packageJson: ToolingPackage) => boolean} [check] The optional check on the tooling package.json
     * @returns {Promise<DiscoveredToolingPackage>}
     */
    discover(folder?: string, check?: (toolingPackage: ToolingPackage) => boolean): Promise<DiscoveredToolingPackage[]>

    /**
     * Adds instances of {ICanDiscoverLocalPackages}
     *
     * @param {...ICanDiscoverLocalPackages[]} discoverers
     */
    add(...discoverers: ICanDiscoverLocalPackages[]): void

    /**
     * Removes all instances of {ICanDiscoverLocalPackages}
     *
     */
    clear(): void
}
