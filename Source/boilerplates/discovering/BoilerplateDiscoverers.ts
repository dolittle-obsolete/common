/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanDiscoverBoilerplates, IBoilerplateDiscoverers, BoilerplatePackage } from '../internal';

/**
 * Represents an implementation of {IBoilerplateDiscoverers}
 *
 * @export
 * @class BoilerplateDiscoverers
 * @implements {IBoilerplateDiscoverers}
 */
export class BoilerplateDiscoverers implements IBoilerplateDiscoverers {

    /**
     * Instantiates an instance of {BoilerplateDiscoverers}.
     * @param {ICanDiscoverBoilerplates[]} boilerplateDiscoverers
     */
    constructor(boilerplateDiscoverers: ICanDiscoverBoilerplates[], private _loggers: ILoggers) {
        this.discoverers = boilerplateDiscoverers;
    }

    readonly discoverers: ICanDiscoverBoilerplates[];

    get boilerplatePaths() {
        const paths: string[] = [];
        this.discoverers.forEach(_ => paths.push(..._.boilerplatePaths));
        return paths;
    }

    get discovered() {
        const boilerplates: BoilerplatePackage[] = [];
        this.discoverers.forEach(_ => boilerplates.push(..._.discovered));
        return boilerplates;
    }

    add(...boilerplateDiscoverers: ICanDiscoverBoilerplates[]) {
        this.discoverers.push(...boilerplateDiscoverers);
    }

    async discover(folder?: string) {
        this._loggers.info('Discovering boilerplates');
        await Promise.all(this.discoverers.map(_ => _.discover(folder)));
        this._loggers.info('Finished discovering boilerplates');
    }
}
