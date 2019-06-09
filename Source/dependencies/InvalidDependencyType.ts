/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {Exception} from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets throw when attempting to create a dependency with an invalid 'type'
 *
 * @export
 * @class InvalidDependencyType
 * @extends {Exception}
 */
export class InvalidDependencyType extends Exception {
    
    /**
     * Instantiates an instance of {InvalidDependencyType}.
     * @param {string[]} dependencyTypes
     */
    constructor(dependencyTypes: string[]) {
        super(`Valid dependency types: ${dependencyTypes.join(', ')}`);
    }
}
