/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {Exception} from '../internal';
import { expect } from 'chai';
import 'mocha';

describe('when throwing an exception', () => {
    const message = 'message';
    let result: Error = null;
    try {
        throw new Exception(message);
    } catch (error) {
        result = error;
    }
    it('should throw an exception', () => expect(result).to.not.be.null);
    it('should throw an error that is an instance of Exception', () => result.should.be.instanceof(Exception));
    it('should have the correct name', () => result.name.should.equal(Exception.name));
    it('should have the correct message', () => result.message.should.equal(message));
});