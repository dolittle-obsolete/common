/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export class ScriptFailed extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ScriptFailed);
    }

    static get new() {
        return new ScriptFailed('Script failed to execute');
    } 
}
