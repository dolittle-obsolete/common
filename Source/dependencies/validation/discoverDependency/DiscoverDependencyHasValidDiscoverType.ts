/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { InvalidField, IDiscoverDependency, DiscoverDependencyValidator, dependencyDiscoverTypes, CannotValidateDependency } from '../../internal';

/**
 * Represents a concrete implementation of {DiscoverDependencyValidator} that validates that a discover dependency has a valid the 'discoverType' field
 *
 * @export
 * @class DependencyHasValidDiscoverType
 * @extends {DiscoverDependencyValidator}
 */
export class DiscoverDependencyHasValidDiscoverType extends DiscoverDependencyValidator {

    validate(dependency: IDiscoverDependency) {
        if (!this.canValidate(dependency)) throw new CannotValidateDependency(dependency, this);
        if (dependency.discoverType === undefined || !dependencyDiscoverTypes.includes(dependency.discoverType)) 
            throw new InvalidField(dependency, 'discoverType', `Expected 'discoverType' to be any of [${dependencyDiscoverTypes.join(', ')}]`);
    }

}
