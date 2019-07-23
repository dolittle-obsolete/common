/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '@dolittle/tooling.common.packages';
import { ICanDiscoverBoilerplates, IBoilerplateDiscoverers } from './index';

/**
 * Represents an implementation of {IBoilerplateDiscoverers}
 *
 * @export
 * @class BoilerplateDiscoverers
 * @implements {IBoilerplateDiscoverers}
 */
export class BoilerplateDiscoverers implements IBoilerplateDiscoverers {
    private _hasDiscovered = false;
    /**
     * Instantiates an instance of {BoilerplateDiscoverers}.
     * @param {ICanDiscoverBoilerplates[]} boilerplateDiscoverers
     */
    constructor(boilerplateDiscoverers: ICanDiscoverBoilerplates[]) {
        this.discoverers = boilerplateDiscoverers;
    }
    
    readonly discoverers: ICanDiscoverBoilerplates[];
    
    get boilerplatePaths() {
        let paths: string[] = [];
        this.discoverers.forEach(_ => paths.push(..._.boilerplatePaths));
        return paths;
    }

    get discovered() {
        let boilerplates: ToolingPackage[] = [];
        this.discoverers.forEach(_ => boilerplates.push(..._.discovered));
        return boilerplates;
    }

    add(...boilerplateDiscoverers: ICanDiscoverBoilerplates[]) {
        this.discoverers.push(...boilerplateDiscoverers);
    }

    async discover() {
        this._hasDiscovered = true;
        await Promise.all(this.discoverers.map(_ => _.discover()));
    }
}