/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '../internal';

export type DiscoveredToolingPackage = {
    /**
     * The tooling package definition
     *
     * @type {ToolingPackage}
     */
    package: ToolingPackage,

    /**
     * The path of the package
     *
     * @type {string}
     */
    path: string
};
