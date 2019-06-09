/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DiscoverDependency } from '../index';
import { a_valid_configuration_for_discover_dependency } from './given/a_valid_configuration_for_discover_dependency';

describe('when creating discover dependency that discovers files but file match is empty', () => {
    let context = new a_valid_configuration_for_discover_dependency();
    let discoverType = 'file';
    let fileMMatch = '';
    let error = null;
    try {
        new DiscoverDependency(name, context.description, discoverType, undefined, undefined, fileMMatch);
    } catch(e) {
        error = e;
    }
    it('Should throw an exception', () => error.should.not.be.null);
    it('Should throw an exception that is an instance of Error', () => error.should.be.an.instanceof(Error));
});