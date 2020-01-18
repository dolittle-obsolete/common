/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanParseDependencies, discoverDependencyType, IDiscoverDependency, DiscoverDependency, CannotParseDependency, IRulesParser } from '../internal';

/**
 * Represents an implementation of {ICanParseDependencies} for handling the parsing of {DiscoverDependency} objects
 *
 * @export
 * @class DiscoverDependencyParser
 * @implements {ICanParseDependencies}
 */
export class DiscoverDependencyParser implements ICanParseDependencies {

    /**
     * Instantiates an instance of {DiscoverDependencyParser}.
     * @param {IRulesParser} _rulesParser
     */
    constructor(private _rulesParser: IRulesParser) {}

    canParse(obj: any): boolean {
        return obj.type === discoverDependencyType && obj.userInputType === undefined;
    }

    parse(obj: any, name: string): IDiscoverDependency {
        if (!this.canParse(obj)) throw new CannotParseDependency(name);
        return new DiscoverDependency(name, obj.description, this._rulesParser.parse(obj), obj.discoverType, obj.withNamespace,
            obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
    }
 }
