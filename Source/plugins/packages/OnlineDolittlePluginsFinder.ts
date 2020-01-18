/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ToolingPackage, IPackages } from '@dolittle/tooling.common.packages';
import { ICanFindOnlinePluginPackages, packageIsPluginPackage } from '../internal';

const dolittleUser = 'woksin';
/**
 * Represents an implementation of {ICanFindOnlinePluginPackages} that can find plugins online under the dolittle user by going through the npm registry
 *
 * @export
 * @class OnlineDolittlePluginsFinder
 * @implements {ICanFindOnlinePluginPackages}
 */
export class OnlineDolittlePluginsFinder implements ICanFindOnlinePluginPackages {

    /**
     * Instantiates an instance of {OnlineBoilerplatesDiscoverer}
     * @param {ILatestCompatiblePackageFinder} _latestCompatibleFinder
     * @param {ILoggers} _logger
     */
    constructor(private _packages: IPackages, private _logger: ILoggers) {}

    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info('Attempting to find online dolittle plugins');
        const pluginPackages  = await this._packages.latestCompatibleByUser(
            dolittleUser,
            _ => packageIsPluginPackage(_) && keywords.every(keyword => _.keywords.includes(keyword)));

        return pluginPackages;
    }

}
