/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, DependencyValidator, InvalidField, dependencyTypes } from '../internal';


/**
 * Represents a concrete implementation of {DependencyValidator} that validates that any dependency has a valid 'type'
 *
 * @export
 * @class DependencyHasValidType
 * @extends {DependencyValidator}
 */
export class DependencyHasValidType extends DependencyValidator {
    
    canValidate(dependency: IDependency) {
        return super.canValidate(dependency) 
            && (dependency.type !== undefined && dependency.type.trim() !== '');
    }
    validate(dependency: IDependency) {
        if (!dependencyTypes.includes(dependency.type)) 
            throw new InvalidField(dependency, 'type', `expected 'type' to be any of [${dependencyTypes.join(', ')}]`);
    }

}
