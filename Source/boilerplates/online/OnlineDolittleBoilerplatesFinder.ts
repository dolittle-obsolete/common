/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Logger } from '@dolittle/tooling.common.logging';
import { ILatestCompatiblePackageFinder, ToolingPackage } from '@dolittle/tooling.common.packages';
import npmUserPackages from 'npm-user-packages';
import { ICanFindOnlineBoilerplatePackages, packageIsBoilerplatePackage } from '../index';

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
     * @param {ILatestCompatiblePackageFinder} _latestCompatibleFinder
     * @param {Logger} _logger
     */
    constructor(private _latestCompatibleFinder: ILatestCompatiblePackageFinder, private _logger: Logger) {}
    
    async findLatest(keywords: string[] = [], limit: number = 250): Promise<ToolingPackage[]> {
        this._logger.info(`Attempting to find online dolittle boilerplates`);
        let boilerplates: ToolingPackage[] = [];  
        let boilerplatePackageData = (await npmUserPackages(dolittleUser)).filter(packageJson => packageIsBoilerplatePackage(packageJson));

        for (let name of boilerplatePackageData.map(_ => _.name)) {
            let latestCompatibleBoilerplate = await this._latestCompatibleFinder.find(name, 'boilerplates');
            if (latestCompatibleBoilerplate) boilerplates.push(latestCompatibleBoilerplate as any as ToolingPackage);
        }
        return boilerplates;
    }
    

}