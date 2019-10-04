/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, StandardValidatorsForDependency, DiscoverDependency, namespaceDiscoverType, InvalidField } from "../../internal";
import { expect } from "chai";

describe('and there is a non valid dependency', () => {
    let exception;
    let a_valid_dependency = new DiscoverDependency('valid dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    let an_invalid_dependency =  new DiscoverDependency('name', 'desc', [], 'invalid discover type');
    let dependencies = [
       a_valid_dependency,
       an_invalid_dependency
    ]
    try {
        new Dependencies(dependencies, new StandardValidatorsForDependency());
    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(InvalidField))
});