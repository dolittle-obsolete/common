/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanParseDependencies, discoverDependencyType, IDiscoverDependency, DiscoverDependency } from "./internal";

export class DiscoverDependencyParser implements ICanParseDependencies {
     
    canParse(obj: any): boolean {
        return obj.type === discoverDependencyType && obj.userInputType === undefined;
     }     
    parse(obj: any, name: string): IDiscoverDependency {
        return new DiscoverDependency(name, obj.description, obj.discoverType, obj.withNamespace,
            obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
     }
 }