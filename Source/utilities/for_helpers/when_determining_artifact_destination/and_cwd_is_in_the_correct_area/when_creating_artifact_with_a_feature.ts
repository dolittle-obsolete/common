/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { determineDestination } from '../../../helpers';
import { path_with_no_feature } from './given/a_path_with_no_feature';
describe('when creating artifact with a feature', () => {
    const path = require('path');
    let context: any = null;
    let result: {destination: string, name: string};
    const featureSegments = 'feature';
    (beforeEach => {
        context = new path_with_no_feature();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.cwd, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], featureSegments.split('.').join(path.sep))));
});
