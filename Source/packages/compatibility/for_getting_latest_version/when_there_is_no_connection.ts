/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import {Substitute} from '@fluffy-spoon/substitute'
import sinon from 'sinon'; 
import { expect } from 'chai';
import {getLatestVersion, NotConnectedToInternet, ICanFindLatestVersionOfPackage} from '../../internal'

describe('When there is no connection', () => {
    let exception = null;

    before(async () => {
        try {
            await getLatestVersion('name', Substitute.for<ICanFindLatestVersionOfPackage>(), {isConnected: sinon.stub().resolves(false)}, new NullBusyIndicator());
        }
        catch (error) {
            exception = error;
        }
    });

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw a NotConnectedToInternet exception', () => exception.should.be.instanceof(NotConnectedToInternet))
});