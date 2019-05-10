/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import semver from 'semver';
import {Logger} from 'winston';
import { ICanFindOnlineBoilerplatePackages } from './ICanFindOnlineBoilerplatePackages';
import { BoilerplatePackageJson } from './BoundedContextPackageJson';

const toolingPkg = require('../../package.json');

const boilerplatesDiscoverer = require('@dolittle/boilerplates-discoverer');

/**
 * Deals with finding boilerplates online by going through the npm registry
 *
 * @export
 * @class OnlineBoilerPlatesDiscoverer
 * @implements {ICanFindOnlineBoilerplatePackages}
 */
export class OnlineBoilerplatesDiscoverer implements ICanFindOnlineBoilerplatePackages {
    private _logger: Logger;

    /**
     * Initializes a new instance of {OnlineBoiler}
     * @param {Logger} logger
     */
    
    constructor(logger: Logger) {
        this._logger = logger;
    }
    
    /**
     * @inheritdoc
     *
     * @memberof OnlineBoilerPlatesDiscoverer
     */
    async discoverLatestOnlineBoilerplates(keywords: string[] = [], limit: number = 250): Promise<BoilerplatePackageJson[]> {
        this._logger.info(`Attempting to find online boilerplates`);
        let boilerplates: BoilerplatePackageJson[] = [];  
        let boilerplatePackageNames = await boilerplatesDiscoverer(keywords, limit);

        for (let name of boilerplatePackageNames.map((_: any) => _.name)) {
            let compatibleBoilerplate: BoilerplatePackageJson = (await boilerplatesDiscoverer.latestCompatible(name, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch((_: any) => {}));
            if (compatibleBoilerplate) boilerplates.push(compatibleBoilerplate);
        }
        return boilerplates;
    }
    /**
     * @inheritdoc
     * 
     * @memberof OnlineBoilerPlatesDiscoverer
     */
    async discoverLatestOnlineDolittleBoilerplates(): Promise<BoilerplatePackageJson[]> {
        this._logger.info(`Attempting to find online dolittle boilerplates`);
        let boilerplates: BoilerplatePackageJson[] = [];
        let dolittleBoilerplates = await boilerplatesDiscoverer.dolittle();

        for (let name of dolittleBoilerplates.map((_: any) => _.name)) {
            let compatibleBoilerplate: BoilerplatePackageJson = await boilerplatesDiscoverer.latestCompatible(name, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString())
                                                .catch((_: any) => {});
            if (compatibleBoilerplate) boilerplates.push(compatibleBoilerplate);
        }
        return boilerplates;
    }
    /**
     * @inheritdoc
     *
     * @memberof OnlineBoilerPlatesDiscoverer
     */
    async latestCompatibleBoilerplate(boilerplatePackageName: string): Promise<BoilerplatePackageJson> {
        this._logger.info(`Getting latest compatible boilerplate package of ${boilerplatePackageName}`);
        let boilerplate: BoilerplatePackageJson = await boilerplatesDiscoverer.latestCompatible(boilerplatePackageName, (pkgJson: any) => pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString());
        if (boilerplate) this._logger.info(`Latest version: '${boilerplate.version}'`);
        else this._logger.info(`Could not find a version of ${boilerplatePackageName} that is compatible with the tooling version ${toolingPkg.version}`);
        return boilerplate;
    }
}