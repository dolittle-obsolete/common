/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, MissingField, DependencyValidator, CannotValidateDependency } from '../internal';

/**
 * Represents a concrete implementation of {DependencyValidator} that validates that any dependency has the 'type' field
 *
 * @export
 * @class DependencyHasType
 * @extends {DependencyValidator}
 */
export class DependencyHasType extends DependencyValidator {
    
    validate(dependency: IDependency) {
        if (!this.canValidate(dependency)) throw new CannotValidateDependency(dependency, this);
        if (dependency.type === undefined || dependency.type.trim() === '') 
            throw new MissingField(dependency, 'type');
    }

}
