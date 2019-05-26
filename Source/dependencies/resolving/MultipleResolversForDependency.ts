/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets thrown when multiple dependency resolvers are found for a dependency
 *
 * @export
 * @class MultipleResolversForDependency
 * @extends {Error}
 */
export class MultipleResolversForDependency extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MultipleResolversForDependency);
    }

    static get new() {
        return new MultipleResolversForDependency('Found multiple resolvers');
    } 
}