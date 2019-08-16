/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILocalPackageDiscoverers, ICanDiscoverLocalPackages, DiscoveredToolingPackage, ToolingPackage } from "../index";

/**
 * Represents an implementation of {ILocalPackageDiscoverers}
 *
 * @export
 * @class LocalPackageDiscoverers
 * @implements {ILocalPackageDiscoverers}
 */
export class LocalPackageDiscoverers implements ILocalPackageDiscoverers {

    /**
     * Instantiates an instance of {LocalPackageDiscoverers}.
     * @param {ICanDiscoverLocalPackages[]} _discoverers
     */
    constructor(private _discoverers: ICanDiscoverLocalPackages[]) {}

    get discoverers() {
        return this._discoverers;
    }
    
    async discover(check?: (toolingPackage: ToolingPackage) => boolean) {
        let discoveredPackages = Array.prototype.concat.apply(
            [], 
            await Promise.all(this._discoverers.map(_ => _.discover(check)))
        ) as DiscoveredToolingPackage[];

        return discoveredPackages;
    }

    add(...discoverers: ICanDiscoverLocalPackages[]) {
        this._discoverers.push(...discoverers);
    }
    
    clear() {
        this._discoverers = [];
    }
}
