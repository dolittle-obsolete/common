/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependencyParser, CannotParseDependency } from "../../../internal";
import {a_prompt_dependency} from '../given/a_prompt_dependency';
import { expect } from "chai";

describe('and dependency is a prompt dependency', () => {
    let context = new a_prompt_dependency();
    let parser = new DiscoverAndPromptDependencyParser({parse: () => []});
    let exception = null;
    try {
        parser.parse(context.dependency, context.dependency.name);
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception when parsing', () => expect(exception).to.not.be.null);
    it('Should throw a CannotParseDependency exception', () => exception.should.be.instanceof(CannotParseDependency));
});