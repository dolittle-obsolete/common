/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";
import { IDependency } from "../index";

/**
 * The exception that gets throw when a dependency is missing a field that it was expected to have 
 *
 * @export
 * @class MissingField
 * @extends {Exception}
 */
export class MissingField extends Exception {

    /**
     * Instantiates an instance of {MissingField}.
     * @param {IDependency} dependency
     * @param {string} field
     */
    constructor(dependency: IDependency, field: string) {
        super(`Dependency with name '${dependency.name}' is missing field '${field}'`);
    }
}
