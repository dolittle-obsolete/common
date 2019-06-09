/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {PromptDependency, dependencyIsPromptDependency} from '../index';

describe('when checking if prompt dependency is a prompt dependency', () => {
    let dependency = new PromptDependency('name', 'desc', 'input', '');
    it('Should be a discover dependency', () => dependencyIsPromptDependency(dependency).should.be.true);
});