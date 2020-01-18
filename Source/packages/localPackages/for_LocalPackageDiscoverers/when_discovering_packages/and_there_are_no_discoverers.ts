/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { LocalPackageDiscoverers, DiscoveredToolingPackage } from '../../../internal';

describe('and there are no discoverers', () => {
    const discoverers = new LocalPackageDiscoverers([]);

    let result: DiscoveredToolingPackage[];
    beforeEach(async () => {
        result = await discoverers.discover();

    });
    it('Should return no packages', () => result.should.be.empty);
});
