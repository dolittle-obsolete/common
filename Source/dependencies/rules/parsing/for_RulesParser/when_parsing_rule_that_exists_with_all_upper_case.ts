/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { MultipleResolversForDependency } from "../../../internal";
import {a_rules_parser_with_two_rules} from './given/a_rules_parser_with_two_rules'
import { expect } from "chai";

describe('when parsing rule that exists with all upper case', () => {
    let context = new a_rules_parser_with_two_rules();

    let result = context.rulesParser.parse({rules: [context.rule1Name.toUpperCase()]});
    it('Should be parse the rules', () => expect(result).to.not.be.null);
    it('Should parse one rule', () => result.length.should.equal(1));
    it('Should parse to a rule1 rule', () => result[0].should.be.instanceof(context.rule1));
});