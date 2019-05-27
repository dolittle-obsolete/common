/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The exception that gets thrown when the execution of a script failed
 *
 * @export
 * @class ScriptFailed
 * @extends {Error}
 */
export class ScriptFailed extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ScriptFailed);
    }

    static get new() {
        return new ScriptFailed('Script failed to execute');
    } 
}
