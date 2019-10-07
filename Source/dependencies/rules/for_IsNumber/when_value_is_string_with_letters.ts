/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IsNumber } from "../../internal";

describe('when value is string with letters', () => {
    let rule = new IsNumber();

    let result = rule.isRespected('some letters');
    
    it('Should not be respected', () => result.should.be.false);
});