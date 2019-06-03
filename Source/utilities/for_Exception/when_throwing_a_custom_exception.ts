/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { expect } from 'chai';
import 'mocha';
import { a_custom_exception } from './given/a_custom_exception';

describe('when throwing a custom exception', () => {
    const message = 'message';
    let result: Error = null;
    try {
        throw new a_custom_exception(message);
    } catch (error) {
        result = error;
        console.log(result.name)
    }
    it('should throw an exception', () => expect(result).to.not.be.null);
    it('should be an instance of Error', () => result.should.be.instanceof(Error));
    it('should be an instance of Exception', () => result.should.be.instanceof(a_custom_exception));
    it('should have the correct name', () => result.name.should.equal(a_custom_exception.name));
    it('should have the correct message', () => result.message.should.equal(message));
});