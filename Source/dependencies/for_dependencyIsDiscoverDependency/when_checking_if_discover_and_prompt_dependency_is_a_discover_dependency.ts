/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependency, dependencyIsDiscoverDependency } from '../internal';

describe('when checking if discover and prompt dependency is a discover dependency', () => {
    const dependency = new DiscoverAndPromptDependency('name', 'desc', [], 'namespace', 'input', '', undefined, undefined, undefined, 'something');
    it('Should be a discover dependency', () => dependencyIsDiscoverDependency(dependency).should.be.true);
});
