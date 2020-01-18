/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, StandardValidatorsForDependency, DiscoverDependency, namespaceDiscoverType, DuplicateDependencies } from '../../internal';
import { expect } from 'chai';

describe('and there are multiple dependencies with the same name', () => {
    let exception: Error;
    const first_dependency = new DiscoverDependency('a dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    const second_dependency = new DiscoverDependency('a dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    const dependencies = [
        first_dependency,
        second_dependency
    ];
    try {
        new Dependencies(dependencies, new StandardValidatorsForDependency());
    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(DuplicateDependencies));
});
