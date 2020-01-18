/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { MultipleResolversForDependency } from '../../../internal';
import { a_rules_parser_with_two_rules } from './given/a_rules_parser_with_two_rules';
import { expect } from 'chai';

describe('when parsing rule that doest not exist', () => {
    const context = new a_rules_parser_with_two_rules();

    const result = context.rulesParser.parse({rules: ['SomeRule']});
    it('Should be parse the rules', () => expect(result).to.not.be.null);
    it('Should not parse any rules', () => result.length.should.equal(0));
});
