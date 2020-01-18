/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanParseDependencies, discoverDependencyType, IDiscoverDependency, DiscoverAndPromptDependency, IPromptDependency, CannotParseDependency, IRulesParser } from '../internal';

/**
 * Represents an implementation of {ICanParseDependencies} for handling the parsing of {DiscoverAndPromptDependency} objects
 *
 * @export
 * @class DiscoverAndPromptDependencyParser
 * @implements {ICanParseDependencies}
 */
export class DiscoverAndPromptDependencyParser implements ICanParseDependencies {

    /**
     * Instantiates an instance of {DiscoverAndPromptDependencyParser}.
     * @param {IRulesParser} _rulesParser
     */
    constructor(private _rulesParser: IRulesParser) {}

    canParse(obj: any): boolean {
        return obj.type === discoverDependencyType && obj.userInputType !== undefined;
    }

    parse(obj: any, name: string): IDiscoverDependency & IPromptDependency {
        if (!this.canParse(obj)) throw new CannotParseDependency(name);
        return new DiscoverAndPromptDependency(name, obj.description, this._rulesParser.parse(obj), obj.discoverType, obj.userInputType,
        obj.promptMessage, obj.choices, obj.customInput, obj.withNamespace, obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
    }
 }
