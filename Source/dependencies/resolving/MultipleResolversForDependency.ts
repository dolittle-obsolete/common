/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";
import { IDependency } from "../internal";

/**
 * The exception that gets thrown when multiple dependency resolvers are found for a dependency
 *
 * @export
 * @class MultipleResolversForDependency
 * @extends {Exception}
 */
export class MultipleResolversForDependency extends Exception {
    
    /**
     * Instantiates an instance of {MultipleResolversForDependency}.
     * @param {IDependency} dependency
     */
    constructor(dependency: IDependency) {
        super(`Found multiple resolvers for dependency '${dependency.name}'`);
    }
}