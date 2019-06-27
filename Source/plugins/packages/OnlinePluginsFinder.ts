/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ILatestCompatiblePackageFinder, ToolingPackage, toolingPackageKeywords } from '@dolittle/tooling.common.packages';
import { Logger } from '@dolittle/tooling.common.logging';
import npmKeyword from 'npm-keyword';
import { ICanFindOnlinePluginPackages, pluginPackageKeyword } from '../index';

/**
 * Represents an implementation of {ICanFindOnlinePluginPackages} that can find plugins online by going through the npm registry
 *
 * @export
 * @class OnlinePluginsFinder
 * @implements {ICanFindOnlinePluginPackages}
 */
export class OnlinePluginsFinder implements ICanFindOnlinePluginPackages {
    
    /**
     * Instantiates an instance of {OnlinePluginsFinder}
     * @param {ILatestCompatiblePluginsFinder} _latestCompatibleFinder
     * @param {Logger} _logger
     */
    constructor(private _latestCompatibleFinder: ILatestCompatiblePackageFinder, private _logger: Logger) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info(`Attempting to find online plugins`);
        let plugins: ToolingPackage[] = [];  
        let pluginPackageNames = await npmKeyword(toolingPackageKeywords.concat(pluginPackageKeyword).concat(keywords), {size: limit});

        for (let name of pluginPackageNames.map(_ => _.name)) {
            let latestCompatiblePlugin= await this._latestCompatibleFinder.find(name, pluginPackageKeyword);
            if (latestCompatiblePlugin) plugins.push(latestCompatiblePlugin as any as ToolingPackage);
        }
        return plugins;
    }
}