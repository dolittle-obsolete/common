import { a_bounded_contexts_manager } from "./an_applications_manager";
import { BoilerPlate } from "../../../boilerPlates/BoilerPlate";
import { Dependency } from "../../../dependencies/Dependency";
import { ApplicationsManager } from "../../ApplicationsManager";
const path = require('path');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_system_that_has_a_boilerplate_with_a_dependency extends a_bounded_contexts_manager{
    constructor() {
        super();
        this.language = 'csharp';
        
        this.dependencies = [
            new Dependency('description', 'name', 'userInput', undefined, 'input', undefined, 'message')
        ];
        this.boiler_plate_location = path.resolve('path', 'to', 'boilerplate');

        this.boiler_plates_manager.boilerPlatesByLanguageAndType.returns([
            new BoilerPlate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 
                this.boiler_plate_location, [], [])
        ]
        );
        
        this.applications_manager = new ApplicationsManager(this.boiler_plates_manager, logger);
    }
 }