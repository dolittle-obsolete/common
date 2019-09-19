/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IInitializer, ICanFindLocalToolingPlatform, ICanDownloadToolingPlatform } from "./internal";

/**
 * Represents an implementation of {IInitializer}
 *
 * @export
 * @class Initializer
 * @implements {IInitializer}
 */
export class Initializer implements IInitializer {
    
    constructor(private _toolingPackage: {version: string}, private _localToolingPlatformFinder: ICanFindLocalToolingPlatform, 
        private _toolingPlatformDownloader: ICanDownloadToolingPlatform) {}
    
    async initialize(){
        if (!await this._localToolingPlatformFinder.exists(this._toolingPackage)) {
            await this._toolingPlatformDownloader.download(this._toolingPackage)
        }
    }

}