/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The error that gets throw when a dependency is missing a field that it was expected to have 
 *
 * @export
 * @class DependencyMissingFieldError
 * @extends {Error}
 */
export class DependencyMissingFieldError extends Error {
    private constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, DependencyMissingFieldError);
    }
    static new(dependencyName: string, field: string) { 
        return new DependencyMissingFieldError(`Dependency with name '${dependencyName}' is missing field '${field}'`);
    }
}
