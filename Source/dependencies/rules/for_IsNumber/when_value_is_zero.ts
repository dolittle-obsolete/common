/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IsNumber } from '../../internal';

describe('when value is zero', () => {
    const rule = new IsNumber();

    const result = rule.isRespected(0);

    it('Should be respected', () => result.should.be.true);
});
