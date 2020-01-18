/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, StandardValidatorsForDependency, DiscoverDependency, InvalidField } from '../../internal';
import { expect } from 'chai';

describe('and adding a valid dependency', () => {
    const dependency =  new DiscoverDependency('name', 'desc', [], 'invalid discover type');

    const dependencies = new Dependencies([], new StandardValidatorsForDependency());
    let exception: Error;
    try {
        dependencies.add(dependency);

    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(InvalidField));

});
