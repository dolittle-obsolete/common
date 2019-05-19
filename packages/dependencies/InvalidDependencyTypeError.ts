/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The error that gets throw when attempting to create an invalid dependency 
 *
 * @export
 * @class DependencyMissingFieldError
 * @extends {Error}
 */
export class InvalidDependencyTypeError extends Error {
    private constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, InvalidDependencyTypeError);
    }
    static new(dependencyTypes: string[]) { 
        return new InvalidDependencyTypeError(`Valid dependency types: ${dependencyTypes.join(', ')}`);
    }
}
