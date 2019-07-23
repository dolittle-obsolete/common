/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyParser, CannotParseDependency } from "../../../index";
import {a_discover_and_prompt_dependency} from '../given/a_discover_and_prompt_dependency';

describe('and dependency is a discover and prompt dependency', () => {
    let context = new a_discover_and_prompt_dependency();
    let parser = new PromptDependencyParser();
    let exception = null;
    try {
        parser.parse(context.dependency, context.dependency.name);
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception when parsing', () => expect(exception).to.not.be.null);
    it('Should throw a CannotParseDependency exception', () => exception.should.be.instanceof(CannotParseDependency))
});