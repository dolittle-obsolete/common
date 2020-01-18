/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency, IDiscoverDependency, IDependencyRule } from './internal';

/**
 * Represents an implementation of {IDiscoverDependency} for the configuration of a dependency with only a 'discover' element
 *
 * @export
 * @class DiscoverDependency
 * @extends {Dependency}
 * @implements {IDiscoverDependency}
 */
export class DiscoverDependency extends Dependency implements IDiscoverDependency  {

    /**
     * Instantiates an instance of {DiscoverDependency}.
     * @param {string} name
     * @param {string} description
     * @param {IDependencyRule[]} rules
     * @param {string} discoverType
     * @param {boolean} [withNamespace]
     * @param {string} [milestone]
     * @param {string} [fileMatch]
     * @param {string} [contentMatch]
     * @param {string} [fromArea]
     */
    constructor (name: string, description: string, rules: IDependencyRule[],  discoverType: string, withNamespace?: boolean, milestone?: string, fileMatch?: string,
            contentMatch?: string, fromArea?: string ) {
        super(name, description, 'discover', rules);
        this.discoverType = discoverType;
        this.withNamespace = withNamespace;
        this.milestone = milestone ? new RegExp(milestone) : undefined;
        this.fileMatch = fileMatch ? new RegExp(fileMatch) : undefined;
        this.contentMatch = contentMatch ? new RegExp(contentMatch) : undefined;
        this.fromArea = fromArea;
    }
    readonly discoverType: string;

    readonly withNamespace?: boolean;

    readonly milestone?: RegExp;

    readonly fileMatch?: RegExp;

    readonly contentMatch?: RegExp;

    readonly fromArea?: string;

}
