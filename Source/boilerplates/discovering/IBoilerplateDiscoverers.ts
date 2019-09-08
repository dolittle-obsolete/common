/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanDiscoverBoilerplates, BoilerplatePackage } from "../index";

/**
 * Defines a system that knows about {ICanDiscoverBoilerplate} boilerplates discoverers
 *
 * @export
 * @interface ICanDiscoverBoilerplates
 */
export interface IBoilerplateDiscoverers {

    /**
     * The boilerplate discoverers
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
    discover(): Promise<void>

    /**
     * The discovered boilerplates
     */
    discovered: BoilerplatePackage[]

    /**
    * Gets the paths of the Dolittle boilerplates
    */
    boilerplatePaths: string[]
}