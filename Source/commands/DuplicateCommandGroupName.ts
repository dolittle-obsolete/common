/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when there are multiple command groups with the same name
 *
 * @export
 * @class DuplicateCommandGroupName
 * @extends {Exception}
 */
export class DuplicateCommandGroupName extends Exception {

    /**
     * Instantiates an instance of {DuplicateCommandGroupName}.
     * @param {string} commandGroupName
     */
    constructor(commandGroupName: string) {
        super(`Found multiple command groups with the name '${commandGroupName}'`);
    }
}