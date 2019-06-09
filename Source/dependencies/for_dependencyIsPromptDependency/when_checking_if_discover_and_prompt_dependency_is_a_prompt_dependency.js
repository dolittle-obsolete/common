/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {DiscoverAndPromptDependency, dependencyIsPromptDependency} from '../index';

describe('when checking if discover and prompt dependency is a prompt dependency', () => {
    let dependency = new DiscoverAndPromptDependency('name', 'desc', 'namespace', 'input', '', undefined, undefined, undefined, 'something');
    it('Should not be a prompt dependency', () => dependencyIsPromptDependency(dependency).should.be.false);
});