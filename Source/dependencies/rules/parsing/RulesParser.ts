/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyRule, IRulesParser } from "../../internal";

/**
 * Defines a rule for a dependency
 *
 * @export
 * @class RulesParser
 */
export class RulesParser implements IRulesParser {

    /**
     * Instantiates an instance of {RulesParser}.
     * @param {IDependencyRule[]} _rules
     */
    constructor(private _rules: IDependencyRule[]) {}

    parse(dependencyObject: any) {
        let rules: IDependencyRule[] = []

        if (!dependencyObject.rules) return rules;

        dependencyObject.rules.forEach((ruleName: string) => {
            rules.push(...this._rules.filter(_ => _.constructor.name.toLowerCase() === ruleName.toLowerCase()));
        });
        return rules;
    }

}
