/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyParser } from "../../../index";
import {a_prompt_dependency} from '../given/a_prompt_dependency';

describe('and dependency is a prompt dependency', () => {
    let context = new a_prompt_dependency();
    let parser = new DiscoverDependencyParser();
    it('Should not be able to parse dependency', () => parser.canParse(context.dependency).should.be.false);
});