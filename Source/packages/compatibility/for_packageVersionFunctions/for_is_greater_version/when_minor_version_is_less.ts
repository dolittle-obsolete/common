/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isGreaterVersion } from '../../../internal';

describe('when minor version is less', () => {
    const greaterVersion = '1.1.0';
    const lesserVersion = '1.0.0';
    const result = isGreaterVersion(lesserVersion, greaterVersion);
    it('should not be a greater version', () => result.should.be.false);
});
