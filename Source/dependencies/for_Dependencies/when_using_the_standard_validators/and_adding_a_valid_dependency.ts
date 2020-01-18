/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, StandardValidatorsForDependency, DiscoverDependency, namespaceDiscoverType } from '../../internal';
import { expect } from 'chai';

describe('and adding a valid dependency', () => {
    const dependency = new DiscoverDependency('dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');

    const dependencies = new Dependencies([], new StandardValidatorsForDependency());
    dependencies.add(dependency);

    it('Should create an instance of Dependencies', () => expect(dependencies).to.not.be.undefined);
    it('Dependencies should contain the dependency', () => dependencies.dependencies.includes(dependency).should.be.true);

});
