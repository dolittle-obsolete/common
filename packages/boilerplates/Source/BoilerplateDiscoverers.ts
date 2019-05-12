/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson } from './BoundedContextPackageJson';
import { ICanDiscoverBoilerplates } from './ICanDiscoverBoilerplates';
import { IBoilerplateDiscoverers } from './IBoilerplateDiscoverers';

/**
 * Represents a system for dealing with all boilerplate discoverers
 *
 * @export
 * @class BoilerplateDiscoverers
 * @implements {IBoilerplateDiscoverers}
 */
export class BoilerplateDiscoverers implements IBoilerplateDiscoverers {
    
    /**
     * Creates an instance of BoilerplateDiscoverers.
     * @param {ICanDiscoverBoilerplates[]} boilerplateDiscoverers
     * @memberof BoilerplateDiscoverers
     */
    constructor(boilerplateDiscoverers: ICanDiscoverBoilerplates[]) {
        this.boilerplateDiscoverers = boilerplateDiscoverers;
    }

    readonly boilerplateDiscoverers: ICanDiscoverBoilerplates[];
    /**
     * @inheritdoc
     *
     * @readonly
     * @type {string[]}
     * @memberof BoilerplatesDiscoverer
     */
    get boilerplatePaths() {
        let paths: string[] = [];
        this.boilerplateDiscoverers.forEach(_ => paths.push(..._.boilerplatePaths));
        return paths;
    }
    /**
     * @inheritdoc
     *
     * @readonly
     * @type {BoilerplatePackageJson[]}
     * @memberof BoilerplatesDiscoverer
     */
    get discoveredBoilerplates(): BoilerplatePackageJson[] {
        let boilerplates: BoilerplatePackageJson[] = [];
        this.boilerplateDiscoverers.forEach(_ => boilerplates.push(..._.discoveredBoilerplates));
        return boilerplates;
    }
    /**
     * @inheritdoc
     * @memberof BoilerplatesManager
     */
    discover() {
        this.boilerplateDiscoverers.forEach(_ => _.discover());
    }
}