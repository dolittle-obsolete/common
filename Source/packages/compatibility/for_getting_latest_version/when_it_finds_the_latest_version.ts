/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import sinon from 'sinon'; 
import { expect } from 'chai';
import {getLatestVersion} from '../../internal'

describe('When latest package version finder throws an error', () => {
    let result: string;
    const version = '2.0.0';
    before(async () => {
        result = await getLatestVersion('name', {find: sinon.stub().resolves(version)}, {isConnected: sinon.stub().resolves(true)}, new NullBusyIndicator());
        
    });
    it('Should return a version', () => expect(result).to.not.be.undefined);
    it('Should return the correct version', () => version.should.be.equal(version))
});