/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ILatestCompatiblePackageFinder, ToolingPackage, toolingPackageKeywords } from '@dolittle/tooling.common.packages';
import { Logger } from '@dolittle/tooling.common.logging';
import npmKeyword from 'npm-keyword';
import { ICanFindOnlineBoilerplatePackages, boilerplatePackageKeyword } from '../index';

/**
 * Represents an implementation of {ICanFindOnlineBoilerplatePackages} that can find boilerplates online by going through the npm registry
 *
 * @export
 * @class OnlineBoilerPlatesDiscoverer
 * @implements {ICanFindOnlineBoilerplatePackages}
 */
export class OnlineBoilerplatesDiscoverer implements ICanFindOnlineBoilerplatePackages {
    
    /**
     * Instantiates an instance of {OnlineBoilerplatesDiscoverer}
     * @param {ILatestCompatibleBoilerplateFinder} _latestCompatibleFinder
     * @param {Logger} _logger
     */
    constructor(private _latestCompatibleFinder: ILatestCompatiblePackageFinder, private _logger: Logger) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info(`Attempting to find online boilerplates`);
        let boilerplates: ToolingPackage[] = [];  
        let boilerplatePackageNames = await npmKeyword(toolingPackageKeywords.concat(boilerplatePackageKeyword).concat(keywords), {size: limit});

        for (let name of boilerplatePackageNames.map(_ => _.name)) {
            let latestCompatibleBoilerplate= await this._latestCompatibleFinder.find(name, 'boilerplates');
            if (latestCompatibleBoilerplate) boilerplates.push(<ToolingPackage><any>latestCompatibleBoilerplate);
        }
        return boilerplates;
    }
}