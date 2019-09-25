/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {requireInternet} from '../../internal';
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';
describe('When there is a connection', () => {
    let busyIndicator = new NullBusyIndicator();
    busyIndicator.stop = sinon.stub();
    before(async () => {
        await requireInternet({isConnected: sinon.stub().resolves(true)}, busyIndicator)
    });

    it('Should call stop on busy indicator', () => busyIndicator.stop.should.be.calledOnce);
});