/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { MissingField, IDiscoverDependency, DiscoverDependencyValidator } from '../../internal';

/**
 * Represents a concrete implementation of {DiscoverDependencyValidator} that validates that a discover dependency has the 'discoverType' field
 *
 * @export
 * @class DependencyHasDiscoveryType
 * @extends {DiscoverDependencyValidator}
 */
export class DiscoverDependencyHasDiscoverType extends DiscoverDependencyValidator {

    validate(dependency: IDiscoverDependency) {
        if (dependency.discoverType === undefined || dependency.discoverType.trim() === '') 
            throw new MissingField(dependency, 'discoverType');
    }

}
