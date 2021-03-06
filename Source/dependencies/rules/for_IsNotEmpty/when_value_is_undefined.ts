/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import { IsNotEmpty } from '../../internal';

describe('when value is undefined', () => {
    const rule = new IsNotEmpty();

    const result = rule.isRespected(undefined);

    it('Should not be respected', () => result.should.be.false);
});
