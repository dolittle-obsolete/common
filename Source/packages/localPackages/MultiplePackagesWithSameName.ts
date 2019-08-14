/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when multiple tooling packages with the same name has been discovered
 *
 * @export
 * @class MultiplePackagesWithSameName
 * @extends {Exception}
 */
export class MultiplePackagesWithSameName extends Exception {
    /**
     * Instantiates an instance of {MultiplePackagesWithSameName}.
     * @param {string} message
     */
    constructor(packageName: string) {
        super(`Multiple tooling packages with the name '${packageName}' was discovered`);
    }
}
