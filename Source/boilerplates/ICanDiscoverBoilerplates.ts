/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson } from "./index";

/**
 * Defines a system that's responsible for discovering boilerplates
 *
 * @export
 * @interface ICanDiscoverBoilerplates
 */
export interface ICanDiscoverBoilerplates {

    /**
     * Discovers boilerplates and returns them.
     *
     */
    discover(): void

    /**
     * The discovered boilerplates
     *
     * @type {BoilerplatePackageJson[]}
     */
    discovered: BoilerplatePackageJson[]

    /**
    * The paths of the Dolittle boilerplates
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    */
    boilerplatePaths: string[]
}