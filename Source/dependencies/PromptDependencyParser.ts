/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanParseDependencies, promptDependencyType, IPromptDependency, PromptDependency, CannotParseDependencyError } from "./internal";

/**
 * Handles the parsing of {PromptDependency} Objects
 *
 * @export
 * @class PromptDependencyParser
 * @implements {ICanParseDependencies}
 */
export class PromptDependencyParser implements ICanParseDependencies {
     
    canParse(obj: any): boolean {
        return obj.type === promptDependencyType;
     }     
    parse(obj: any, name: string): IPromptDependency {
        if (!this.canParse(obj)) throw CannotParseDependencyError.new;
        return new PromptDependency(name, obj.description, obj.userInputType, obj.promptMessage, obj.choices, obj.customInput );
     }


 }