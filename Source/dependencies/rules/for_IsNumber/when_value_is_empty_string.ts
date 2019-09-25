/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IsNumber } from "../../internal";

describe('when value is empty string', () => {
    let rule = new IsNumber();

    let result = rule.isRespected('');
    
    it('Should not be respected', () => result.should.be.false);
});