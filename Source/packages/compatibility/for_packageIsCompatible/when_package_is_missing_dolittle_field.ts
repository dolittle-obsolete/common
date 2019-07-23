/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {packageIsCompatible} from '../../index';
import { a_tooling_package } from './given/a_tooling_package';

describe('When package is missing dolittle field', () => {
    let context = new a_tooling_package();
    let pkg: any = {};
    it('It should not be a compatible package', () => packageIsCompatible(pkg, context.tooling_package).should.be.false);
});