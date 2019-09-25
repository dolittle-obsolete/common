/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DependencyMissingField, DiscoverDependency } from '../internal';
import { a_valid_configuration_for_discover_dependency } from './given/a_valid_configuration_for_discover_dependency';

describe('when creating discover dependency with empty discover type', () => {
    let context = new a_valid_configuration_for_discover_dependency();
    let discoverType = '';
    let error = null;
    try {
        new DiscoverDependency(context.name, context.description, discoverType)
    } catch(e) {
        error = e;
    }
    it('Should throw an exception', () => error.should.not.be.null);
    it('Should throw an Error exception', () => error.should.be.an.instanceof(Error))
});