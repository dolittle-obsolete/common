/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The error that gets thrown when multiple dependency resolvers are found for a dependency
 *
 * @export
 * @class MultipleResolversError
 * @extends {Error}
 */
export class MultipleResolversError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleResolversError);
    }

    static get new() {
        return new MultipleResolversError('Found multiple resolvers');
    } 
}