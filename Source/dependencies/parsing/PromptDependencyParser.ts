/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanParseDependencies, promptDependencyType, IPromptDependency, PromptDependency, CannotParseDependency, IRulesParser } from "../internal";

/**
 * Handles the parsing of {PromptDependency} Objects
 *
 * @export
 * @class PromptDependencyParser
 * @implements {ICanParseDependencies}
 */
export class PromptDependencyParser implements ICanParseDependencies {
     
    /**
     * Instantiates an instance of {PromptDependencyParser}.
     * @param {IRulesParser} _rulesParser
     */
    constructor(private _rulesParser: IRulesParser) {}
    
    canParse(obj: any): boolean {
        return obj.type === promptDependencyType;
    }

    parse(obj: any, name: string): IPromptDependency {
        if (!this.canParse(obj)) throw new CannotParseDependency(name);
        return new PromptDependency(name, obj.description, this._rulesParser.parse(obj), obj.userInputType, obj.promptMessage, 
            obj.optional, obj.choices, obj.customInput );
     }

 }