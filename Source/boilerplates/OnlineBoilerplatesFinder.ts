/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Logger } from 'winston';
import { FullVersion } from 'package-json';
import npmKeyword from 'npm-keyword';
import { BoilerplatePackage, ICanFindOnlineBoilerplatePackages, ILatestCompatibleBoilerplateFinder, dolittleBoilerplatePackageKeywords } from './index';

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
    constructor(private _latestCompatibleFinder: ILatestCompatibleBoilerplateFinder, private _logger: Logger) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<BoilerplatePackage[]> {
        this._logger.info(`Attempting to find online boilerplates`);
        let boilerplates: BoilerplatePackage[] = [];  
        let boilerplatePackageNames = await npmKeyword(dolittleBoilerplatePackageKeywords.concat(keywords), {size: limit});

        for (let name of boilerplatePackageNames.map(_ => _.name)) {
            let latestCompatibleBoilerplate: FullVersion | null = (await this._latestCompatibleFinder.find(name)
                                                .catch((_: any) => null));
            if (latestCompatibleBoilerplate) boilerplates.push(<BoilerplatePackage><any>latestCompatibleBoilerplate);
        }
        return boilerplates;
    }
}