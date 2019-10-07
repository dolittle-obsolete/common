/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {packageIsCompatible} from '../../internal';
import { a_tooling_package } from './given/a_tooling_package';

describe('When package is valid and compatible', () => {
    let context = new a_tooling_package();
    let pkg: any = {
        dolittle: {
            tooling: '2.*'
        }
    };
    
    it('It should be a compatible package', () => packageIsCompatible(pkg, context.tooling_package).should.be.true);
});