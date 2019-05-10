/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export class DependencyMissingFieldError extends Error {
    private constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, DependencyMissingFieldError);
    }
    static new(dependencyName: string, field: string) { 
        return new DependencyMissingFieldError(`Dependency with name '${dependencyName}' is missing field '${field}'`);
    }
}
