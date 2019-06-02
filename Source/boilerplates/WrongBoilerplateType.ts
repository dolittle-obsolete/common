/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when the an unexpected {Boilerplate} type was received 
 *
 * @export
 * @class WrongBoilerplateType
 * @extends {Exception}
 */
export class WrongBoilerplateType extends Exception {
    /**
     * Instantiates an instance of {WrongBoilerplateType}.
     * @param {string} [message]
     */
    constructor(message?: string) {
        super(message);
    }
}
