/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { BoilerplatePackage } from "../internal";


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
    discover(): Promise<void>

    /**
     * The discovered boilerplates
     *
     * @type {BoilerplatePackage[]}
     */
    discovered: BoilerplatePackage[]

    /**
    * The paths of the Dolittle boilerplates
    *
    * @readonly
    * @type {string[]} Filesystem paths of the Dolittle boilerplates installed on the system
    */
    boilerplatePaths: string[]
}