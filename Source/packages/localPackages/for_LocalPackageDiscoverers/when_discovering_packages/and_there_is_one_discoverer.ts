/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { LocalPackageDiscoverers, DiscoveredToolingPackage, ICanDiscoverLocalPackages } from '../../../internal';
import { Substitute, Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import sinon from 'sinon';

describe('and there are no discoverers', () => {
    let discoverer: SubstituteOf<ICanDiscoverLocalPackages>;
    beforeEach(async () => {
        discoverer = Substitute.for<ICanDiscoverLocalPackages>();
        discoverer.discover().returns(Promise.resolve([]));
        const discoverers = new LocalPackageDiscoverers([discoverer]);
        await discoverers.discover();

    });
    it('Should call discover on discoverer', () => discoverer.received(1).discover());
});
