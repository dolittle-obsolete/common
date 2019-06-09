/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanParseDependencies, discoverDependencyType, IDiscoverDependency, DiscoverDependency, CannotParseDependency } from '../index';

/**
 * Represents an implementation of {ICanParseDependencies} for handling the parsing of {DiscoverDependency} objects
 *
 * @export
 * @class DiscoverDependencyParser
 * @implements {ICanParseDependencies}
 */
export class DiscoverDependencyParser implements ICanParseDependencies {
     
    canParse(obj: any): boolean {
        return obj.type === discoverDependencyType && obj.userInputType === undefined;
    }

    parse(obj: any, name: string): IDiscoverDependency {
        if (!this.canParse(obj)) throw new CannotParseDependency(name);
        return new DiscoverDependency(name, obj.description, obj.discoverType, obj.withNamespace,
            obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
    }
 }