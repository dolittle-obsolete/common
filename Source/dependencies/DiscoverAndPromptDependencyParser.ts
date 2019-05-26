/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanParseDependencies, discoverDependencyType, IDiscoverDependency, DiscoverAndPromptDependency, IPromptDependency, CannotParseDependencyError } from "./internal";

/**
 * Handles the parsing of {DiscoverAndPromptDependency} objects
 *
 * @export
 * @class DiscoverAndPromptDependencyParser
 * @implements {ICanParseDependencies}
 */
export class DiscoverAndPromptDependencyParser implements ICanParseDependencies {
     
    canParse(obj: any): boolean {
        return obj.type === discoverDependencyType && obj.userInputType !== undefined;
     }     
    parse(obj: any, name: string): IDiscoverDependency & IPromptDependency {
        if (!this.canParse(obj)) throw CannotParseDependencyError.new;
        return new DiscoverAndPromptDependency(name, obj.description, obj.discoverType, obj.userInputType, obj.promptMessage, obj.choices,
            obj.customInput, obj.withNamespace, obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
    }
 }