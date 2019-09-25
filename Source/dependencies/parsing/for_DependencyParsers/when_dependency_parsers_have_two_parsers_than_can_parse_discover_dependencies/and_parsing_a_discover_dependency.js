/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_parsers } from "../given/dependencies_and_a_system_that_knows_about_no_parsers";
import { DiscoverDependencyParser, MultipleParsersForDependency } from "../../../internal";


describe('and parsing a discover dependency', () => {
    let context = new dependencies_and_a_system_that_knows_about_no_parsers();
    context.dependencyParsers.add(new DiscoverDependencyParser())
    context.dependencyParsers.add(new DiscoverDependencyParser())
    let exception = null;

    try {
        context.dependencyParsers.parse(context.discoverDependency, context.discoverDependency.name);
    } catch (error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.null);
    it('Should throw a MultipleParsersForDependency exception', () => exception.should.be.instanceof(MultipleParsersForDependency));
});