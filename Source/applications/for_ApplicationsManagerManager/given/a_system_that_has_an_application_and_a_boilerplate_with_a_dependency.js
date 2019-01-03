import { a_bounded_contexts_manager, an_applications_manager } from "./an_applications_manager";
import { BoilerPlate } from "../../../boilerPlates/BoilerPlate";
import { Dependency } from "../../../dependencies/Dependency";
import { ApplicationsManager } from "../../ApplicationsManager";
import { Guid } from "../../../Guid";
const path = require('path');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_system_that_has_an_application_and_a_boilerplate_with_a_dependency extends an_applications_manager{
    constructor() {
        super();
        this.language = 'csharp';
        this.application_json = {
            id: Guid.create(),
            name: 'app'
        };
        this.dependencies = [
            new Dependency('description', 'name', 'userInput', undefined, 'input', undefined, 'message')
        ];
        this.boiler_plate_path = path.resolve('path', 'to', 'boilerplate.json');

        this.boiler_plates_manager.boilerPlatesByLanguageAndType.returns([
            new BoilerPlate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 
                this.boiler_plate_path, [], [])
        ]);
        this.file_system.existsSync.returns(true);
        this.file_system.readFileSync.returns(JSON.stringify(this.application_json));
        
        this.applications_manager = new ApplicationsManager(this.boiler_plates_manager, this.file_system, logger);
    }
 }