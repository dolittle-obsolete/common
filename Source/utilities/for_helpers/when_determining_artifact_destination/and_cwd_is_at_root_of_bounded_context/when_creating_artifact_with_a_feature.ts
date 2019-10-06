/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {determineDestination} from '../../../helpers';
import { a_configuration_for_cwd_at_root } from './given/a_configuration_for_cwd_at_root';

describe('when creating artifact with a feature', () => {
    const path = require('path');
    let context: any = null;
    let result: {destination: string, name: string};
    let featureSegments = 'feature';
    (beforeEach => {
        context = new a_configuration_for_cwd_at_root();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.boundedContextPath, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], featureSegments.split('.').join(path.sep))));
});