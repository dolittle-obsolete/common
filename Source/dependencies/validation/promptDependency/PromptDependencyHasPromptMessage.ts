/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { MissingField, IPromptDependency, PromptDependencyValidator } from '../../internal';

/**
 * Represents a concrete implementation of {PromptDependencyValidator} that validates that a discover dependency has the 'promptMessage' field
 *
 * @export
 * @class DependencyHasPromptMessage
 * @extends {PromptDependencyValidator}
 */
export class PromptDependencyHasPromptMessage extends PromptDependencyValidator {

    canValidate(dependency: IPromptDependency) {
        return super.canValidate(dependency) && dependency.userInputType !== undefined;
    }
    validate(dependency: IPromptDependency) {
        if (dependency.promptMessage === undefined || dependency.promptMessage.trim() === '')
            throw new MissingField(dependency, 'promptMessage');
    }

}
