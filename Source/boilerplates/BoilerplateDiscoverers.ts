/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerplatePackageJson, ICanDiscoverBoilerplates, IBoilerplateDiscoverers } from './internal';

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
 
     */
    get discoveredBoilerplates(): BoilerplatePackageJson[] {
        let boilerplates: BoilerplatePackageJson[] = [];
        this.boilerplateDiscoverers.forEach(_ => boilerplates.push(..._.discoveredBoilerplates));
        return boilerplates;
    }

    addDiscoverers(...boilerplateDiscoverers: ICanDiscoverBoilerplates[]): void {
        this.boilerplateDiscoverers.push(...boilerplateDiscoverers);
    }
    /**
     * @inheritdoc
 
     */
    discover() {
        this.boilerplateDiscoverers.forEach(_ => _.discover());
    }
}