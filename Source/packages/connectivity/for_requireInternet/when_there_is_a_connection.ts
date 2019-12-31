/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullBusyIndicator, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import sinon from 'sinon';
import { Substitute } from '@fluffy-spoon/substitute';
import { requireInternet } from '../../internal';
describe('When there is a connection', () => {
    const busyIndicator = Substitute.for<IBusyIndicator>();
    (busyIndicator as any).stop = sinon.stub();
    before(async () => {
        await requireInternet({isConnected: sinon.stub().resolves(true)}, busyIndicator);
    });

    it('Should call stop on busy indicator', () => busyIndicator.stop.should.be.calledOnce);
});
