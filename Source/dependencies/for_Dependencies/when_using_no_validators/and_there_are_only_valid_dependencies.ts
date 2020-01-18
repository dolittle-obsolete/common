/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, DiscoverDependency, namespaceDiscoverType } from '../../internal';
import { expect } from 'chai';
import { no_validators } from './given/no_validators';

describe('and there are only valid dependencies', () => {
    const first_dependency = new DiscoverDependency('first dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    const second_dependency =  new DiscoverDependency('second dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    const dependencies = [
        first_dependency,
        second_dependency
    ];
    const result = new Dependencies(dependencies, new no_validators());

    it('Should create an instance of Dependencies', () => expect(result).to.not.be.undefined);
    it('Dependencies should contain first dependency', () => result.dependencies.includes(first_dependency).should.be.true);
    it('Dependencies should contain second dependency', () => result.dependencies.includes(second_dependency).should.be.true);
});
