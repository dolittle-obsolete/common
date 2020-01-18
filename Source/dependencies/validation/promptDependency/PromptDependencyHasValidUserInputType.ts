/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { InvalidField, IPromptDependency, PromptDependencyValidator, dependencyUserInputTypes, CannotValidateDependency } from '../../internal';

/**
 * Represents a concrete implementation of {PromptDependencyValidator} that validates that a prompt dependency has a valid the 'userInputType' field
 *
 * @export
 * @class DependencyHasValidUserInputType
 * @extends {PromptDependencyValidator}
 */
export class PromptDependencyHasValidUserInputType extends PromptDependencyValidator {

    canValidate(dependency: IPromptDependency) {
        return super.canValidate(dependency) && dependency.userInputType !== undefined;
    }
    validate(dependency: IPromptDependency) {
        if (!this.canValidate(dependency)) throw new CannotValidateDependency(dependency, this);
        if (dependency.userInputType === undefined || !dependencyUserInputTypes.includes(dependency.userInputType))
            throw new InvalidField(dependency, 'userInputType', `Expected 'userInputType' to be any of [${dependencyUserInputTypes.join(', ')}]`);
    }

}
