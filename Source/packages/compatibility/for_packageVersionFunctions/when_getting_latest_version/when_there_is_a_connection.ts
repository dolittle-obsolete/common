/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IConnectionChecker, ICanFindLatestVersionOfPackage, getLatestVersion } from '../../../internal';

describe('when there is a connection', () => {
    const packageName = 'name';
    const latestVersion = '1.0.0';
    const latestPackageVersionFinder: ICanFindLatestVersionOfPackage = {
        find: _ => Promise.resolve(latestVersion)
    };
    const connectionChecker: IConnectionChecker = {
        isConnected: () => Promise.resolve(true)
    };
    const busyIndicator = new NullBusyIndicator();
    let result: string;
    beforeEach(async () => {
        result = await getLatestVersion(packageName, latestPackageVersionFinder, connectionChecker, busyIndicator);
    });
    it('Should return the version', () => result.should.be.equal(latestVersion));
});
