/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoveredToolingPackage, ToolingPackage } from "../index";

/**
 * Defines a system that can discover locally installed tooling packages
 *
 * @export
 * @interface ICanDiscoverLocalPackages
 */
export interface ICanDiscoverLocalPackages {

    /**
     * Discovers the locally installed tooling packages
     *
     * @param {(packageJson: ToolingPackage) => boolean} [check] The optional check on the package.json
     * @returns {Promise<DiscoveredToolingPackage[]>}
     */
    discover(check?: (toolingPackage: ToolingPackage) => boolean): Promise<DiscoveredToolingPackage[]>
}