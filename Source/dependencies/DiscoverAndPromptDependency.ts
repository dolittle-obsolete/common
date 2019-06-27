/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {DiscoverDependency, IPromptDependency, PromptDependency} from './index';

/**
 * Represents an implementation of {IPromptDependency} for the configuration of a dependency which has both a 'discover' element and a 'prompt' element. 
 *
 * @export
 * @class DiscoverAndPromptDependency
 * @extends {DiscoverDependency}
 * @implements {IPromptDependency}
 */
export class DiscoverAndPromptDependency extends DiscoverDependency implements IPromptDependency {
    
    /**
     * Instantiates an instance of {DiscoverAndPromptDependency}.
     * @param {string} name
     * @param {string} description
     * @param {string} discoverType
     * @param {string} userInputType
     * @param {string} promptMessage
     * @param {any[]} [choices]
     * @param {string} [customInput]
     * @param {boolean} [withNamespace]
     * @param {string} [milestone]
     * @param {string} [fileMatch]
     * @param {string} [contentMatch]
     * @param {string} [fromArea]
     */
    constructor (name: string, description: string, discoverType: string, userInputType: string, promptMessage: string,
            choices?: any[], customInput?: string, withNamespace?: boolean, milestone?: string, fileMatch?: string, 
            contentMatch?: string, fromArea?: string ) {
        super(name, description, discoverType, withNamespace, milestone, fileMatch, contentMatch, fromArea);
        this.userInputType = userInputType;
        this.choices = choices;
        this.promptMessage = promptMessage;
        this.customInput = customInput;

        PromptDependency.throwIfInvalidPromptDependency(this.userInputType, this.promptMessage);
    }
    
    readonly optional = false;
    
    readonly userInputType: string;
    
    readonly promptMessage: string;
    
    readonly choices?: any[];
    
    readonly customInput?: string;
}