/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import npmKeyword from 'npm-keyword';
import { ICanFindPackagesWithKeywords, toolingPackageKeywords } from "./index";

/**
 * Represents an implementation of {ICanFindPackagesWithKeywords} that finds packages on npm
 *
 * @export
 * @class NpmPackagesWithKeywordsFinder
 * @implements {ICanFindPackagesWithKeywords}
 */
export class NpmPackagesWithKeywordsFinder implements ICanFindPackagesWithKeywords {
    
    async find(additionalKeywords: string[], limit?: number) {
        let packages = await npmKeyword(toolingPackageKeywords.concat(additionalKeywords), {size: limit});
        return packages;
    }
}
