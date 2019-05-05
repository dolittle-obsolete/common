/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Boilerplate } from '../../../boilerplates/Boilerplate';
import { Dependency } from '../../../dependencies/Dependency';
import { ApplicationsManager } from '../../ApplicationsManager';
import { Guid } from '../../../Guid';
import path from 'path';


export class a_system_that_has_an_application_and_a_boilerplate_with_a_dependency {
    constructor() {
        this.boiler_plates_manager = {
            boilerplatesByLanguageAndType: sinon.stub(),
            createInstance: sinon.stub()
        };
        this.file_system = {
            readFileSync: sinon.stub(),
            existsSync: sinon.stub()  
        };

        this.applications_manager = new ApplicationsManager(this.boiler_plates_manager, this.file_system, logger);
        this.language = 'csharp';
        this.application_json = {
            id: Guid.create(),
            name: 'app'
        };
        this.dependencies = [
            new Dependency('description', 'name', 'userInput', undefined, 'input', undefined, 'message')
        ];
        this.boiler_plate_path = path.resolve('path', 'to', 'boilerplate.json');

        this.boiler_plates_manager.boilerplatesByLanguageAndType.returns([
            new Boilerplate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 'namespace', 'target', 'frameWork', {name: 'parent name', language: 'parent language', type: 'parent type'},
                this.boiler_plate_path, [], [])
        ]);
        this.file_system.existsSync.returns(true);
        this.file_system.readFileSync.returns(JSON.stringify(this.application_json));
        
        this.applications_manager = new ApplicationsManager(this.boiler_plates_manager, this.file_system, logger);
    }
 }