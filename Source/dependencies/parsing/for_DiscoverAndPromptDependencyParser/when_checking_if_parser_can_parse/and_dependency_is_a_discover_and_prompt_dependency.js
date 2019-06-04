/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependencyParser } from "../../../index";
import {a_discover_and_prompt_dependency} from '../given/a_discover_and_prompt_dependency';

describe('and dependency is a discover and prompt dependency', () => {
    let context = new a_discover_and_prompt_dependency();
    let parser = new DiscoverAndPromptDependencyParser();
    it('Should be able to parse dependency', () => parser.canParse(context.dependency).should.be.true);
});