/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {IDependency, DependencyMissingField} from './index';

export const discoverDependencyType = 'discover';
export const promptDependencyType = 'userInput';

export const dependencyTypes = [
    discoverDependencyType,
    promptDependencyType
];

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
     */
    constructor (name: string, description: string, type: string) {
        this.description = description;
        this.name = name;
        this.type = type;

        this.throwIfInvalidName();
    }

    readonly name: string;

    readonly description: string;

    readonly type: string;

    private throwIfInvalidName() {
        if (this.name === undefined || this.name.trim() === '') throw new DependencyMissingField(this, 'name');
    }
}