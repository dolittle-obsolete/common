/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export class ScriptFailedError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ScriptFailedError);
    }

    static get new() {
        return new ScriptFailedError('A script failed to execute');
    } 
}
