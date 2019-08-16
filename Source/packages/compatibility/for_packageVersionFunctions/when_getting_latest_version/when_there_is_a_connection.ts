/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getLatestVersion } from '../../packageVersionFunctions';
import { NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { ICanFindLatestVersionOfPackage } from '../../../ICanFindLatestVersionOfPackage';
import { IConnectionChecker } from '../../../connectivity';
;
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
    it('it should return the version', async () => (await getLatestVersion(packageName, latestPackageVersionFinder, connectionChecker, busyIndicator)).should.be.equal(latestVersion));
});