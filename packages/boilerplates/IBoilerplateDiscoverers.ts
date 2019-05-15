/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson, ICanDiscoverBoilerplates } from "./internal";

/**
 * Responsible for discovering boilerplates
 *
 * @export
 * @interface ICanDiscoverBoilerplates
 */
export interface IBoilerplateDiscoverers {
    /**
     * The boilerplate discoverers
     *
     * @type {ICanDiscoverBoilerplates[]}
     * @memberof IBoilerplateDiscoverers
     */
    readonly boilerplateDiscoverers: ICanDiscoverBoilerplates[]
    /**
     * Adds discoverers
     *
     * @param {...ICanDiscoverBoilerplates[]} boilerplateDiscoverers
     * @memberof IBoilerplateDiscoverers
     */
    addDiscoverers(...boilerplateDiscoverers: ICanDiscoverBoilerplates[]): void

    /**
     * Discovers boilerplates
     *
     * @memberof IBoilerplateDiscoverers
     */
    discover(): void

    /**
     * The discovered boilerplates
     *
     * @type {BoilerplatePackageJson[]}
     * @memberof IBoilerplateDiscoverers
     */
    discoveredBoilerplates: BoilerplatePackageJson[]

    /**
    * Gets the paths of the Dolittle boilerplates
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    * @memberof IBoilerplateDiscoverers
    */
    boilerplatePaths: string[]
}