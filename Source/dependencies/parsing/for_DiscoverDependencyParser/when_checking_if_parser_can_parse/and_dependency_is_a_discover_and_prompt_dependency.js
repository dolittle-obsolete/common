/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyParser } from "../../../internal";
import {a_discover_and_prompt_dependency} from '../given/a_discover_and_prompt_dependency';

describe('and dependency is a discover and prompt dependency', () => {
    let context = new a_discover_and_prompt_dependency();
    let parser = new DiscoverDependencyParser();
    it('Should not be able to parse dependency', () => parser.canParse(context.dependency).should.be.false);
});