/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { determineDestination } from '../../../internal';
import { a_configuration_for_cwd_at_root } from './given/a_configuration_for_cwd_at_root';

describe('when creating artifact with multiple features', () => {
    const path = require('path');
    let context: any = null;
    let result: {destination: string, name: string};
    const featureSegments = 'feature1.feature2';
    (beforeEach => {
        context = new a_configuration_for_cwd_at_root();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.boundedContextPath, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], featureSegments.split('.').join(path.sep))));
});
