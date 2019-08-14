/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets throw when the given arguments doesn't match up with the argument dependencies
 *
 * @export
 * @class ArgumentsNotMatchingDependencies
 * @extends {Exception}
 */
export class ArgumentsNotMatchingDependencies extends Exception {

    /**
     * Instantiates an instance of {ArgumentsNotMatchingDependencies}.
     */
    constructor() {
        super('Given arguments not matching dependencies');
    }
}
