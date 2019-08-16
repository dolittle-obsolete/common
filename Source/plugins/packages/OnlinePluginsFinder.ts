/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ToolingPackage, IPackages } from '@dolittle/tooling.common.packages';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanFindOnlinePluginPackages } from '../index';

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
     * @param {ILoggers} _logger
     */
    constructor(private _packages: IPackages, private _logger: ILoggers) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info(`Attempting to find online plugins`); 
        let pluginPackages = await this._packages.latestCompatibleWithKeywords(keywords, limit);
        
        return pluginPackages;
    }
}
