/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { all_supported_boiler_plates } from './given/all_supported_boiler_plates';

describe('when asking for boundedcontext boiler plates', () => {
    let context = new all_supported_boiler_plates();
    let result = null;
    let expected = context.boilerPlates.filter(_ => _.type === 'boundedContext');

    (beforeEach => {
        result = context.boilerPlatesManager.boilerPlatesByType('boundedContext');
    })();

    it('should return exact number of boiler plates', () => result.length.should.equal(2));
    it('should return the expected boiler plates', 
        () => expected.forEach(_ => result.filter(i => _.equals(i)).length.should.equal(1)));
});