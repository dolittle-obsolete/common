/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { MissingField, IPromptDependency, PromptDependencyValidator } from '../../index';

/**
 * Represents a concrete implementation of {PromptDependencyValidator} that validates that a prompt dependency has the 'userInputType' field
 *
 * @export
 * @class DependencyHasUserInputType
 * @extends {PromptDependencyValidator}
 */
export class PromptDependencyHasUserInputType extends PromptDependencyValidator {

    validate(dependency: IPromptDependency) {
        if (dependency.userInputType === undefined || dependency.userInputType.trim() === '') 
            throw new MissingField(dependency, 'userInputType');
    }

}
