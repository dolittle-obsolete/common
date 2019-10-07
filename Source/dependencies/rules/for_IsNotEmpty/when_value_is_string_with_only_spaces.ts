/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { IsNotEmpty } from "../../internal";

describe('when value is string with only spaces', () => {
    let rule = new IsNotEmpty();

    let result = rule.isRespected('    ');
    
    it('Should be respected', () => result.should.be.true);
});