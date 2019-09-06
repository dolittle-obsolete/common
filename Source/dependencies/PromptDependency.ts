/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {IPromptDependency, Dependency, IDependencyRule} from './index';

/**
 * Represents an implementation of {IPromptDependency} for the configuration of a dependency with only the 'prompt' element
 *
 * @export
 * @class PromptDependency
 * @extends {Dependency}
 * @implements {IPromptDependency}
 */
export class PromptDependency extends Dependency implements IPromptDependency {

    /**
     * Instantiates an instance of {PromptDependency}.
     * @param {string} name
     * @param {string} description
     * @param {IDependencyRule[]} rules
     * @param {string} userInputType
     * @param {string} promptMessage
     * @param {boolean} [optional=false]
     * @param {any[]} [choices]
     * @param {string} [customInput]
     */
    constructor (name: string, description: string, rules: IDependencyRule[], userInputType: string, promptMessage: string, optional: boolean = false, choices?: any[], 
            customInput?: string) {
        super(name, description, 'userInput', rules);
        this.userInputType = userInputType;
        this.promptMessage = promptMessage;
        this.optional = optional;
        this.choices = choices;
        this.customInput = customInput;
    }

    readonly optional: boolean;

    readonly userInputType: string;
    
    readonly promptMessage: string;
    
    readonly choices?: any[];
    
    readonly customInput?: string;

}
