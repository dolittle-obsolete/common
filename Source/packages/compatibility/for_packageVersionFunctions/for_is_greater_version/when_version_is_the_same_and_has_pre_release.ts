/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isGreaterVersion } from '../../../internal';

describe('when version is the same and has pre release', () => {
    const version1 = '1.0.0-pre-release.1';
    const version2 = '1.0.0';
    let result = isGreaterVersion(version1, version2);
    it('should not be a greater version', () => result.should.be.false);
});