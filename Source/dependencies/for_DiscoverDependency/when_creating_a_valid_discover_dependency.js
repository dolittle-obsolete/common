/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverDependency } from '../internal';
import { a_valid_configuration_for_discover_dependency } from './given/a_valid_configuration_for_discover_dependency';


describe('when a valid discover dependency', () => {
    let context = new a_valid_configuration_for_discover_dependency();
    let dependency = new DiscoverDependency(context.name, context.description, context.discoverType, context.withNamespace, context.milestone, context.fileMatch, context.contentMatch, context.fromArea);

    it('Should have the correct name', () => dependency.name.should.be.equal(context.name));
    it('Should have the correct description', () => dependency.description.should.be.equal(context.description));
    it('Should have the correct type', () => dependency.type.should.be.equal('discover'));
    it('Should have the correct discoverType', () => dependency.discoverType.should.be.equal(context.discoverType));
    it('Should not have defined withNamespace', () => expect(dependency.withNamespace).to.be.equal(context.withNamespace));
    it('Should have the correct milestone', () => dependency.milestone.source.should.be.equal(context.milestone.source));
    it('Should not have defined fileMatch', () => expect(dependency.fileMatch).to.be.be.equal(context.fileMatch));
    it('Should not have defined contentMatch', () => expect(dependency.contentMatch).to.be.equal(context.contentMatch));
    it('Should not have defined fromArea', () => expect(dependency.contentMatch).to.be.equal(context.fromArea));
});