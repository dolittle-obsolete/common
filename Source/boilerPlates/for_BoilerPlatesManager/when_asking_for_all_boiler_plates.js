/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { all_supported_boiler_plates } from './given/all_supported_boiler_plates';

describe('when asking for all boiler plates', () => {
    let context = new all_supported_boiler_plates();
    let result = null;

    (beforeEach => {
        result = context.boilerPlatesManager.boilerPlates;
        console.log(result);
    })();

    it('should return same number of boiler plates', () => result.length.should.equal(context.boilerPlates.length));
});