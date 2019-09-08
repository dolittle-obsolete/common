/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency, IValidatorsFor } from "./index";


 /**
 * Defines a system that knows about dependencies
 *
 * @export
 * @interface IDependencies
 */
export interface IDependencies {
    
    /**
     * The dependencies 
     *
     * @type {IDependency[]}
     */
    readonly dependencies: IDependency[]

    /**
     * The system that knows about validators
     *
     * @type {IValidatorsFor<IDependency>}
     */
    readonly validators: IValidatorsFor<IDependency>

    /**
     * Adds dependencies
     *
     * @param {...IDependency[]} dependencies
     */
    add(...dependencies: IDependency[]): void
}
