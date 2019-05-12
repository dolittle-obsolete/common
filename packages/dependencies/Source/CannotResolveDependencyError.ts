/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class CannotResolveDependencyError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CannotResolveDependencyError);
    }

    static get new() {
        return new CannotResolveDependencyError('Cannot resolve given dependency');
    } 
}