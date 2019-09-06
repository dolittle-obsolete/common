/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, MissingField, DependencyValidator } from '../index';

/**
 * Represents a concrete implementation of {DependencyValidator} that validates That any dependency has the 'name' field
 *
 * @export
 * @class DependencyHasName
 * @extends {DependencyValidator}
 */
export class DependencyHasName extends DependencyValidator {
    
    validate(dependency: IDependency) {
        if (dependency.name === undefined || dependency.name.trim() === '') 
            throw new MissingField(dependency, 'name');
    }

}
