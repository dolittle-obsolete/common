/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IInitializer, ICanFindLocalToolingPlatform } from "./internal";

/**
 * Represents an implementation of {IInitializer}
 *
 * @export
 * @class Initializer
 * @implements {IInitializer}
 */
export class Initializer implements IInitializer {
    
    constructor(private _toolingPackage: {version: string}, private _localToolingPlatformFinder: ICanFindLocalToolingPlatform) {}
    
    async initialize(){
        if (!await this._localToolingPlatformFinder.exists(this._toolingPackage)) {
            console.log('It does not exist!');
        }
        else {
            // IF NOT EXISTS DONWLOAD THE TOOLING PACKAGES
            console.log('It exists!');
        }
    }

}