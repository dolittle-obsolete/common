/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {
    IDependency, ValidatorsFor, DependencyHasName, DependencyHasType, DependencyHasValidType,
    DiscoverDependencyHasDiscoverType, DiscoverDependencyHasFileMatchWhenDiscoveringFiles,
    DiscoverDependencyHasMilestoneWhenDiscoveringNamespace, DiscoverDependencyHasValidArea,
    DiscoverDependencyHasValidDiscoverType,
    PromptDependencyHasPromptMessage,
    PromptDependencyHasUserInputType,
    PromptDependencyHasValidUserInputType
} from '../internal';

/**
 * Represents an implementation of {ValidatorsFor<IDependency>} that contains all the standard dependency validators
 *
 * @export
 * @class StandardValidatorsForDependency
 * @extends {ValidatorsFor<IDependency>}
 */
export class StandardValidatorsForDependency extends ValidatorsFor<IDependency> {

    /**
     * Instantiates an instance of {StandardValidatorsForDependency}.
     */
    constructor() {
        super([
            new DependencyHasName(),
            new DependencyHasType(),
            new DependencyHasValidType(),

            new DiscoverDependencyHasDiscoverType(),
            new DiscoverDependencyHasFileMatchWhenDiscoveringFiles(),
            new DiscoverDependencyHasMilestoneWhenDiscoveringNamespace(),
            new DiscoverDependencyHasValidArea(),
            new DiscoverDependencyHasValidDiscoverType(),

            new PromptDependencyHasPromptMessage(),
            new PromptDependencyHasUserInputType(),
            new PromptDependencyHasValidUserInputType()
        ]);
    }

}
