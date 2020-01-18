/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyParser, IRulesParser } from '../../../internal';
import { a_prompt_dependency } from '../given/a_prompt_dependency';
import Substitute from '@fluffy-spoon/substitute';

describe('and dependency is a prompt dependency', () => {
    const context = new a_prompt_dependency();
    const parser = new PromptDependencyParser(Substitute.for<IRulesParser>());
    it('Should be able to parse dependency', () => parser.canParse(context.dependency).should.be.true);
});
