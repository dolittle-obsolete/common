/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { IsNumber } from "../../internal";

describe('when value is undefined', () => {
    let rule = new IsNumber();

    let result = rule.isRespected(undefined);
    
    it('Should not be respected', () => result.should.be.false);
});