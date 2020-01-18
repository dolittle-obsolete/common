/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets thrown when the execution of a script failed
 * @export
 * @class ScriptFailed
 * @extends {Exception}
 */
export class ScriptFailed extends Exception {

    /**
     * Instantiates an instance of {ScriptFailed}.
     */
    constructor(error: Error | string) {
        super(`Script failed to execute. Message '${error.toString()}'`);
    }
}
