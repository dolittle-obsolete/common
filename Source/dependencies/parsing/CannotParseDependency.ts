/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets throw when there aren't any dependency parsers that can parse a dependency
 *
 * @export
 * @class CannotParseDependency
 * @extends {Exception}
 */
export class CannotParseDependency extends Exception {

    /**
     * Instantiates an instance of {CannotParseDependency}.
     * @param {string} dependencyName
     */
    constructor(dependencyName: string) {
        super(`Cannot parse given dependency with name '${dependencyName}'`);
    }
}