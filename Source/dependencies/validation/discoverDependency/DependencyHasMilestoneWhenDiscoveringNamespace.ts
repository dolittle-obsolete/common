/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDiscoverDependency, DiscoverDependencyValidator, MissingField } from '../../index';

/**
 * Represents a concrete implementation of {DiscoverDependencyValidator} that validates that a discover dependency has a 'milestone' when it's discovering a namespace
 *
 * @export
 * @class DependencyHasMilestoneWhenDiscoveringNamespace
 * @extends {DiscoverDependencyValidator}
 */
export class DependencyHasMilestoneWhenDiscoveringNamespace extends DiscoverDependencyValidator {

    canValidate(dependency: IDiscoverDependency) {
        return super.canValidate(dependency) 
            && (dependency.withNamespace !== undefined || dependency.discoverType === 'namespace');
    }
    validate(dependency: IDiscoverDependency) {
        if (dependency.milestone === undefined || dependency.milestone.source.trim() === '') 
            throw new MissingField(dependency, 'milestone');
    }

}
