/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPackages, ILatestCompatiblePackageFinder, ICanFindPackagesByUser, ICanFindPackagesWithKeywords, ToolingPackage, ToolingPackageDescriptor } from "./index";

/**
 * Represents an implementation of {IPackages}
 *
 * @export
 * @class Packages
 * @implements {IPackages}
 */
export class Packages implements IPackages {
    
    /**
     * Instantiates an instance of {Packages}.
     * @param {ILatestCompatiblePackageFinder} _latestCompatiblePackageFinder
     * @param {ICanFindPackagesByUser[]} _packagesByUserFinders
     * @param {ICanFindPackagesWithKeywords[]} _packagesWithKeywordsFinders
     */
    constructor(
        private _latestCompatiblePackageFinder: ILatestCompatiblePackageFinder,
        private _packagesByUserFinders: ICanFindPackagesByUser[],
        private _packagesWithKeywordsFinders: ICanFindPackagesWithKeywords[] ) {}
     
    async withKeywords(keywords: string[], limit?: number) {
        let packages = await Promise.all(this._packagesWithKeywordsFinders.map(_ => _.find(keywords, limit)));
        return Array.prototype.concat.apply([], packages) as ToolingPackageDescriptor[];
    }

    async byUser(user: string, check?: ((packageJson: any) => boolean)) {
        let packages = await Promise.all(this._packagesByUserFinders.map(_ => _.find(user, check)));
        return Array.prototype.concat.apply([], packages) as ToolingPackageDescriptor[];
    }
    
    async latestCompatibleWithKeywords(keywords: string[], limit?: number) {
        let packages = await this.withKeywords(keywords, limit);
        let latestCompatiblePackages = await this.getLatestCompatiblePackages(packages);

        return latestCompatiblePackages;
    }
    async latestCompatibleByUser(user: string, check?: ((packageJson: any) => boolean)) {
        let packages = await this.byUser(user, check);
        let latestCompatiblePackages = await this.getLatestCompatiblePackages(packages);

        return latestCompatiblePackages;
    }

    private async getLatestCompatiblePackages(packages: ToolingPackageDescriptor[]) {
        let latestCompatiblePackages = (await Promise
            .all(packages
                    .map(_ => _.name)
                    .map(_ => this._latestCompatiblePackageFinder.find(_))
                )
            ).filter(_ => _ !== null) as ToolingPackage[];
        return latestCompatiblePackages;
    }

    
}