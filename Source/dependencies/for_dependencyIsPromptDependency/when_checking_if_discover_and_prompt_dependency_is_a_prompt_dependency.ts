/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependency, dependencyIsPromptDependency } from '../internal';

describe('when checking if discover and prompt dependency is a prompt dependency', () => {
    const dependency = new DiscoverAndPromptDependency('name', 'desc', [], 'namespace', 'input', '', undefined, undefined, undefined, 'something');
    it('Should not be a prompt dependency', () => dependencyIsPromptDependency(dependency).should.be.false);
});
