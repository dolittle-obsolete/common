/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import Substitute from "@fluffy-spoon/substitute";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { IDependencyRule } from "../../../../internal";
import { RulesParser } from "../../RulesParser";

class rule1 implements IDependencyRule {
    isRespected(value: any): boolean {
        return true;
    }

}
class rule2 implements IDependencyRule {
    isRespected(value: any): boolean {
        return true;
    }

}
export class a_rules_parser_with_two_rules {
    rule1Name: string;
    rule2Name: string;
    rulesParser: RulesParser;
    rule1: typeof rule1;
    rule2: typeof rule2;
    
    constructor() {
        this.rule1 = rule1;
        this.rule2 = rule2;
        this.rule1Name = rule1.name;
        this.rule2Name = rule2.name;
        this.rulesParser = new RulesParser([new rule1(), new rule2()])
    }
}
    