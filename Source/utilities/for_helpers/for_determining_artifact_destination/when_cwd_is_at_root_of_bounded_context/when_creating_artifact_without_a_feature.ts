/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {determineDestination} from '../../../index';
import { a_configuration_for_cwd_at_root } from './given/a_configuration_for_cwd_at_root';

describe('when creating artifact without a feature', () => {
    const path = require('path');
    let context = null;
    let result = '';
    (beforeEach => {
        context = new a_configuration_for_cwd_at_root();
        result = determineDestination(context.area, context.language, context.name, context.boundedContextPath, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], '/')));
});