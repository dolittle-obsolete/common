/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets throw when a dependency is missing a field that it was expected to have 
 *
 * @export
 * @class DependencyMissingField
 * @extends {Error}
 */
export class DependencyMissingField extends Error {

    /**
     * Instantiates an instance of {DependencyMissingField}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, DependencyMissingField);
    }
    
    static new(dependencyName: string, field: string) { 
        return new DependencyMissingField(`Dependency with name '${dependencyName}' is missing field '${field}'`);
    }
}
