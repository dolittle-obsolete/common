/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyParser } from "../../../internal";
import {a_discover_dependency} from '../given/a_discover_dependency';

describe('and dependency is a discover dependency', () => {
    let context = new a_discover_dependency();
    let parser = new PromptDependencyParser();
    it('Should not be able to parse dependency', () => parser.canParse(context.dependency).should.be.false);
});