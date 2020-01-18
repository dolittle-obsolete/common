/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { MultipleResolversForDependency } from '../../../internal';
import { a_rules_parser_with_two_rules } from './given/a_rules_parser_with_two_rules';
import { expect } from 'chai';

describe('when parsing two rule that exists', () => {
    const context = new a_rules_parser_with_two_rules();

    const result = context.rulesParser.parse({rules: [context.rule1Name, context.rule2Name]});
    it('Should be parse the rules', () => expect(result).to.not.be.null);
    it('Should parse one rule', () => result.length.should.equal(2));
    it('Should parse first rule to a rule1', () => result[0].should.be.instanceof(context.rule1));
    it('Should parse second rule to a rule2', () => result[1].should.be.instanceof(context.rule2));
});
