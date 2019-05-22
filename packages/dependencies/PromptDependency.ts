/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {IPromptDependency, Dependency} from './internal';

export const argumentUserInputType = 'argument';
export const inputUserInputType = 'input';
export const confirmUserInputType = 'confirm';
export const chooseOneUserInputType = 'chooseOne';
export const chooseMultipleUserInputType = 'chooseMultiple';

export const dependencyUserInputTypes = [
    argumentUserInputType,
    inputUserInputType,
    confirmUserInputType,
    chooseOneUserInputType,
    chooseMultipleUserInputType
];

/**
 * Represents the configuration of a dependency with only the 'prompt' element
 *
 * @export
 * @class PromptDependency
 * @extends {Dependency}
 * @implements {IPromptDependency}
 */
export class PromptDependency extends Dependency implements IPromptDependency {
    constructor (name: string, description: string, userInputType: string, promptMessage: string, choices?: any[], 
            customInput?: string) {
        super(name, description, 'userInput');
        this.userInputType = userInputType;
        this.choices = choices;
        this.promptMessage = promptMessage;
        this.customInput = customInput;

        PromptDependency.throwIfInvalidPromptDependency(userInputType, userInputType);
    }
    readonly userInputType: string;
    readonly promptMessage: string;
    readonly choices?: any[];
    readonly customInput?: string;

    static throwIfInvalidPromptDependency(userInputType: string, promptMessage: string) {
        let throwError = false;
        let errors = [];
        if (userInputType !== undefined && !dependencyUserInputTypes.includes(userInputType)) {
            throwError = true;
            errors.push(`Invalid user input type '${userInputType}'`);
        }
        if (userInputType !== undefined && promptMessage === undefined) {
            throwError = true;
            errors.push('A prompt message must be given on a prompt dependency');
        }
    
        if (throwError) {
            throw new Error(`Invalid dependency. Errors:\n\t${errors.join('\n\t')}`);
        }
    }
}