/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {a_system_for_event_artifact } from './given/a_system_for_event_artifact';
import {getFileDirPath} from '../../../helpers';
describe('when_creating_an_event_with_everything_correctly_setup', () => {
    let context = new a_system_for_event_artifact();
    const path = require('path');
    (beforeEach => {
        context.boilerPlatesManager.createArtifactInstance(context.eventArtifactTemplate, context.destination, context.context);
    })();

    it('should call the filesystem to read from the correct path', () => context.fileSystem.readFileSync.should.be.calledWith(path.join(getFileDirPath(context.templatePath), context.includedFiles[0])));
});