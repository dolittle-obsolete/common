/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ILoggers } from '@dolittle/tooling.common.logging';
import { ILatestCompatiblePackageFinder, ToolingPackage } from '@dolittle/tooling.common.packages';
import npmUserPackages from 'npm-user-packages';
import { ICanFindOnlinePluginPackages, packageIsPluginPackage, pluginPackageKeyword } from '../index';

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
    constructor(private _latestCompatibleFinder: ILatestCompatiblePackageFinder, private _logger: ILoggers) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info(`Attempting to find online dolittle plugins`);
        let plugins: ToolingPackage[] = [];  
        let pluginPackageData = (await npmUserPackages(dolittleUser)).filter(packageJson => packageIsPluginPackage(packageJson));

        for (let name of pluginPackageData.map(_ => _.name)) {
            let latestCompatiblePlugin = await this._latestCompatibleFinder.find(name, pluginPackageKeyword);
            if (latestCompatiblePlugin) plugins.push(latestCompatiblePlugin as any as ToolingPackage);
        }
        return plugins;
    }
    

}