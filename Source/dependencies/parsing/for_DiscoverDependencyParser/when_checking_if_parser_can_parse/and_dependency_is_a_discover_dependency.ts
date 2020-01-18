/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyParser, IRulesParser } from '../../../internal';
import { a_discover_dependency } from '../given/a_discover_dependency';
import Substitute from '@fluffy-spoon/substitute';

describe('and dependency is a discover dependency', () => {
    const context = new a_discover_dependency();
    const parser = new DiscoverDependencyParser(Substitute.for<IRulesParser>());
    it('Should be able to parse dependency', () => parser.canParse(context.dependency).should.be.true);
});
