/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { packageIsCompatible } from '../../internal';
import { a_tooling_package } from './given/a_tooling_package';

describe('When package is valid and compatible', () => {
    const context = new a_tooling_package();
    const pkg: any = {
        dolittle: {
            tooling: '2.*'
        }
    };

    it('It should be a compatible package', () => packageIsCompatible(pkg, context.tooling_package).should.be.true);
});
