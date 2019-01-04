/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_boiler_plates_manager } from '../../given/a_boiler_plates_manager';
import { BoilerPlatesManager } from '../../../BoilerPlatesManager';
import path from 'path';
import { ArtifactTemplate } from '../../../../artifacts/ArtifactTemplate';

const oldFileContent = 'some content';

export class a_system_for_event_artifact extends a_boiler_plates_manager {
    constructor() {
        super();
        this.templatePath = path.join('somePath', 'template.json');
        this.includedFiles = [
            '{{name}}.cs'
        ];
        this.eventArtifactTemplate = new ArtifactTemplate('Event template', 'event', 'events', 'Creates an event', 'csharp', [], this.includedFiles, this.templatePath);  
        
        this.folders.getArtifactTemplateFilesRecursivelyIn = sinon.stub().returns(this.includedFiles.map((file, _) => path.join(this.templatePath, file)));
        
        this.fileSystem.readFileSync = sinon.stub().returns(oldFileContent);
        this.fileSystem.writeFileSync = sinon.stub();
        
        this.boilerPlatesManager = new BoilerPlatesManager(
            this.configManager,
            this.httpWrapper,
            this.git,
            this.folders,
            this.fileSystem,
            logger
        );
        this.destination = 'some destination';
        this.context = {
            name: 'TheEvent'
        };
    }
}