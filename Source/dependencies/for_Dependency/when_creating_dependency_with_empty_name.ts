/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { MissingField } from '../internal';
import { a_non_abstract_dependency_class } from './given/a_non_abstract_dependency_class';

describe('when creating dependency with empty name', () => {
    let name = '';
    let error = null;
    try {
        new a_non_abstract_dependency_class(name)
    } catch(e) {
        error = e;
    }
    it('Should throw an exception', () => error.should.not.be.null);
    it('Should throw an DependencyMissingField exception', () => error.should.be.an.instanceof(MissingField))
});