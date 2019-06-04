/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {PromptDependency, dependencyIsDiscoverDependency} from '../index';

describe('when checking if prompt dependency is a discover dependency', () => {
    let dependency = new PromptDependency('name', 'desc', 'input', '');
    it('Should not be a discover dependency', () => dependencyIsDiscoverDependency(dependency).should.be.false);
});