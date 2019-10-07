/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDiscoverDependency, DiscoverDependencyValidator, MissingField, CannotValidateDependency } from '../../internal';

/**
 * Represents a concrete implementation of {DiscoverDependencyValidator} that validates that a discover dependency has a 'milestone' when it's discovering a namespace
 *
 * @export
 * @class DependencyHasMilestoneWhenDiscoveringNamespace
 * @extends {DiscoverDependencyValidator}
 */
export class DiscoverDependencyHasMilestoneWhenDiscoveringNamespace extends DiscoverDependencyValidator {

    canValidate(dependency: IDiscoverDependency) {
        return super.canValidate(dependency) 
            && (dependency.withNamespace === true || dependency.discoverType === 'namespace');
    }
    validate(dependency: IDiscoverDependency) {
        if (!this.canValidate(dependency)) throw new CannotValidateDependency(dependency, this);
        if (dependency.milestone === undefined || dependency.milestone.source.trim() === '') 
            throw new MissingField(dependency, 'milestone');
    }

}
