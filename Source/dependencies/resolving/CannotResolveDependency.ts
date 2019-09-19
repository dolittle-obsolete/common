/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";
import { IDependency } from "../internal";

/**
 * The exception that gets throw when there aren't any dependency resolvers that can resolve a dependency
 *
 * @export
 * @class CannotResolveDependency
 * @extends {Exception}
 */
export class CannotResolveDependency extends Exception {
    /**
     * Instantiates an instance of {CannotResolveDependency}.
     * @param {IDependency} dependency
     */
    constructor(dependency: IDependency) {
        super(`Cannot resolve dependency with name '${dependency.name}'`);
    }
}