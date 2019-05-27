/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatePackage, ICanDiscoverBoilerplates } from "./index";

/**
 * Defines a system that knows about {ICanDiscoverBoilerplate} boilerplates discoverers
 *
 * @export
 * @interface ICanDiscoverBoilerplates
 */
export interface IBoilerplateDiscoverers {

    /**
     * The boilerplate discoverers
     *
     * @type {ICanDiscoverBoilerplates[]}
     */
    readonly discoverers: ICanDiscoverBoilerplates[]

    /**
     * Adds discoverers
     *
     * @param {...ICanDiscoverBoilerplates[]} boilerplateDiscoverers
     */
    add(...boilerplateDiscoverers: ICanDiscoverBoilerplates[]): void

    /**
     * Discovers boilerplates
     *
     */
    discover(): void

    /**
     * The discovered boilerplates
     *
     * @type {BoilerplatePackage[]}
     */
    discovered: BoilerplatePackage[]

    /**
    * Gets the paths of the Dolittle boilerplates
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    */
    boilerplatePaths: string[]
}