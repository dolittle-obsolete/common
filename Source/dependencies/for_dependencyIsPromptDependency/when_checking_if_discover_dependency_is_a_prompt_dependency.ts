/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {DiscoverDependency, dependencyIsPromptDependency} from '../internal';

describe('when checking if discover dependency is a prompt dependency', () => {
    let dependency = new DiscoverDependency('name', 'desc', [], 'namespace', undefined, 'something');
    it('Should not be a discover dependency', () => dependencyIsPromptDependency(dependency).should.be.false);
});