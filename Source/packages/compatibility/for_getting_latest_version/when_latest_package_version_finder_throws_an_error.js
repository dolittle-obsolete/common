/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {getLatestVersion, NotConnectedToInternet} from '../../index'
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';

describe('When latest package version finder throws an error', () => {
    let exception = null;
    let error = new Error('some error')
    before(async () => {
        try {
            await getLatestVersion('name', {find: sinon.stub().rejects(error)}, {isConnected: sinon.stub().resolves(true)}, new NullBusyIndicator());
        }
        catch (error) {
            exception = error;
        }
    });

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw the correct Error', () => exception.should.be.equal(error))
});