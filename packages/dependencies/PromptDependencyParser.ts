/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanParseDependencies, promptDependencyType, IPromptDependency, PromptDependency } from "./internal";

export class PromptDependencyParser implements ICanParseDependencies {
     
    canParse(obj: any): boolean {
        return obj.type === promptDependencyType;
     }     
    parse(obj: any, name: string): IPromptDependency {
        return new PromptDependency(name, obj.description, obj.userInputType, obj.promptMessage, obj.choices, obj.customInput );
     }


 }