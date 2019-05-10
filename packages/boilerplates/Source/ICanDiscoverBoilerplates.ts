import { BoilerplatePackageJson } from "./BoundedContextPackageJson";


/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @interface ICanDiscoverBoilerplates
 */
export interface ICanDiscoverBoilerplates {
    /**
     * Discovers boilerplates and returns them.
     *
     * @memberof ICanDiscoverBoilerplates
     */
    discover(): void
    /**
     * The discovered boilerplates
     *
     * @type {BoilerplatePackageJson[]}
     * @memberof ICanDiscoverBoilerplates
     */
    discoveredBoilerplates: BoilerplatePackageJson[]

    /**
    * Gets the paths of the Dolittle boilerplates
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    * @memberof ICanDiscoverBoilerplates
    */
    boilerplatePaths: string[]
}