/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverDependency } from '../index';
import { a_valid_configuration_for_discover_dependency } from './given/a_valid_configuration_for_discover_dependency.given';

describe('when creating discover dependency that generates namespace without a milestone', () => {
    let context = new a_valid_configuration_for_discover_dependency();
    let discoverType = 'file';
    let milestone = undefined;
    let withNamespace = true;
    let fileMatch = 'something';
    let error = null;
    try {
        new DiscoverDependency(context.name, context.description, discoverType, withNamespace, milestone, fileMatch);
    } catch(e) {
        error = e;
    }
    it('Should throw an exception', () => error.should.not.be.null);
    it('Should throw an DependencyMissingField exception', () => error.should.be.an.instanceof(Error))
});