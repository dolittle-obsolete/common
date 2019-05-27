/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import npmUserPackages from 'npm-user-packages';
import { FullVersion } from 'package-json';
import { Logger } from 'winston';
import { BoilerplatePackage, ICanFindOnlineBoilerplatePackages, ILatestCompatibleBoilerplateFinder, packageIsBoilerplate } from './index';

const dolittleUser = 'woksin';
/**
 * Represents an implementation of {ICanFindOnlineBoilerplatePackages} that can find boilerplates online under the dolittle user by going through the npm registry
 *
 * @export
 * @class OnlineDolittleBoilerplatesFinder
 * @implements {ICanFindOnlineBoilerplatePackages}
 */
export class OnlineDolittleBoilerplatesFinder implements ICanFindOnlineBoilerplatePackages {
    
    /**
     * Instantiates an instance of {OnlineBoilerplatesDiscoverer}
     * @param {Logger} _logger
     */
    constructor(private _latestCompatibleFinder: ILatestCompatibleBoilerplateFinder, private _logger: Logger) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<BoilerplatePackage[]> {
        this._logger.info(`Attempting to find online dolittle boilerplates`);
        let boilerplates: BoilerplatePackage[] = [];  
        let boilerplatePackageData = (await npmUserPackages(dolittleUser)).filter(packageJson => packageIsBoilerplate(packageJson));

        for (let name of boilerplatePackageData.map(_ => _.name)) {
            let latestCompatibleBoilerplate: FullVersion | null = (await this._latestCompatibleFinder.find(name)
                                                .catch((_: any) => null));
            if (latestCompatibleBoilerplate) boilerplates.push(<BoilerplatePackage><any>latestCompatibleBoilerplate);
        }
        return boilerplates;
    }
    

}