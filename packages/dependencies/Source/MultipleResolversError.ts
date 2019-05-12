/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class MultipleResolversError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleResolversError);
    }

    static get new() {
        return new MultipleResolversError('Found multiple resolvers');
    } 
}