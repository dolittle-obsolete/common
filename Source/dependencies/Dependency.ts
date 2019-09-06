/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {IDependency, IDependencyRule} from './index';

/**
 * Represents an abstract implementation of {IDependency} for the abstract base configuration class of a dependency
 *
 * @export
 * @class Dependency
 */
export abstract class Dependency implements IDependency {
    
    /**
     * Instantiates an instance of Dependency.
     * @param {string} name
     * @param {string} description
     * @param {string} type
     * @param {IDependencyRule[]} rules
     */
    constructor (name: string, description: string, type: string, rules: IDependencyRule[]) {
        this.description = description;
        this.name = name;
        this.type = type;
        this.rules = rules;
    }

    readonly name: string

    readonly description: string

    readonly type: string

    readonly rules: IDependencyRule[]

}
