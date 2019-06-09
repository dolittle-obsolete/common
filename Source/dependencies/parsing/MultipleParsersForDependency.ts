/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when multiple dependency parsers are found for a dependency
 *
 * @export
 * @class MultipleParsersForDependency
 * @extends {Exception}
 */
export class MultipleParsersForDependency extends Exception {
    
    /**
     *Instantiates an instance of {MultipleParsersForDependency}.
     * @param {string} dependencyName
     */
    constructor(dependencyName: string) {
        super(`Found multiple parsers for dependency with name '${dependencyName}'`);
    }
}