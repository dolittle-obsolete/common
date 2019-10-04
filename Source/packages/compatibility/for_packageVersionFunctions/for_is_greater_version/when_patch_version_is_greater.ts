/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isGreaterVersion } from '../../../internal';

describe('when patch version is greater', () => {
    const lesserVersion = '1.0.0';
    const greaterVersion = '1.0.1';
    let result = isGreaterVersion(greaterVersion, lesserVersion);
    it('should be a greater version', () => result.should.be.true);
});