/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IPackages } from '@dolittle/tooling.common.packages';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanFindOnlineBoilerplatePackages, boilerplatePackageKeyword } from '../index';

/**
 * Represents an implementation of {ICanFindOnlineBoilerplatePackages} that can find boilerplates online
 *
 * @export
 * @class OnlineBoilerPlatesDiscoverer
 * @implements {ICanFindOnlineBoilerplatePackages}
 */
export class OnlineBoilerplatesDiscoverer implements ICanFindOnlineBoilerplatePackages {
    
    /**
     * Instantiates an instance of {OnlineBoilerplatesDiscoverer}
     * @param {IPAckages} _packages
     * @param {ILoggers} _logger
     */
    constructor(private _packages: IPackages, private _logger: ILoggers) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250) {
        let boilerplatePackages = await this._packages.latestCompatibleWithKeywords([boilerplatePackageKeyword].concat(keywords), limit);
        return boilerplatePackages 
    }
}
