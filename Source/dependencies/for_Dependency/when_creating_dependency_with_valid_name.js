/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../index';
import { a_non_abstract_dependency_class } from './given/a_non_abstract_dependency_class';

describe('when creating dependency with valid name', () => {
    let name = 'the_dependency';
    let dependency = new a_non_abstract_dependency_class(name);

    it('Should have the correct name', () => dependency.name.should.be.equal(name));
    it('Should have the correct description', () => dependency.description.should.be.equal(a_non_abstract_dependency_class.description));
    it('Should have the correct type', () => dependency.type.should.be.equal(a_non_abstract_dependency_class.type));
});