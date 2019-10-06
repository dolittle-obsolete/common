/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependencyParser, CannotParseDependency } from "../../../internal";
import {a_discover_dependency} from '../given/a_discover_dependency';
import { expect } from "chai";

describe('and dependency is a discover dependency', () => {
    let context = new a_discover_dependency();
    let parser = new DiscoverAndPromptDependencyParser({parse: () => []}); 
    let exception: Error;;
    try {
        parser.parse(context.dependency, context.dependency.name);
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception when parsing', () => expect(exception).to.not.be.null);
    it('Should throw a CannotParseDependency exception', () => exception.should.be.instanceof(CannotParseDependency));
});