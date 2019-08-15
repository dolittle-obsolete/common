/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IPackages } from '@dolittle/tooling.common.packages';
import { ICanFindOnlineBoilerplatePackages, packageIsBoilerplatePackage } from '../index';

const dolittleUser = 'woksin';

/**
 * Represents an implementation of {ICanFindOnlineBoilerplatePackages} that can find boilerplates packages under the dolittle user
 *
 * @export
 * @class OnlineDolittleBoilerplatesFinder
 * @implements {ICanFindOnlineBoilerplatePackages}
 */
export class OnlineDolittleBoilerplatesFinder implements ICanFindOnlineBoilerplatePackages {
    
    /**
     * Instantiates an instance of {OnlineBoilerplatesDiscoverer}
     * @param {IPackages} _packages
     * @param {ILoggers} _logger
     */
    constructor(private _packages: IPackages, private _logger: ILoggers) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250) {
        let boilerplatePackages = await this._packages.latestCompatibleByUser(
            dolittleUser, 
            _ => packageIsBoilerplatePackage(_) && keywords.every(keyword => _.keywords.includes(keyword)));
        return boilerplatePackages;
    }
}
