/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * The exception that gets throw when attempting to create a dependency with an invalid 'type'
 *
 * @export
 * @class InvalidDependencyType
 * @extends {Error}
 */
export class InvalidDependencyType extends Error {
    
    /**
     * Instantiates an instance of {InvalidDependencyType}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, InvalidDependencyType);
    }
    
    static new(dependencyTypes: string[]) { 
        return new InvalidDependencyType(`Valid dependency types: ${dependencyTypes.join(', ')}`);
    }
}
