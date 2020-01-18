/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, dependencyIsDiscoverDependency } from '../internal';

describe('when checking if discover dependency is a discover dependency', () => {
    const dependency = new DiscoverDependency('name', 'desc', [], 'namespace', undefined, 'something');
    it('Should be a discover dependency', () => dependencyIsDiscoverDependency(dependency).should.be.true);
});
