/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Boilerplate } from "../../../boilerplates/Boilerplate";
import { Dependency } from "../../../dependencies/Dependency";
import { BoundedContextsManager } from "../../BoundedContextsManager";
import path from 'path';

export class a_system_that_has_a_boilerplate_with_a_dependency{
    constructor() {
        this.boiler_plates_manager = {
            boilerplatesByLanguageAndType: sinon.stub(),
            createInstance: sinon.stub()
        };
        this.language = 'csharp';
        
        this.dependencies = [
            new Dependency('description', 'name', 'userInput', undefined, 'input', undefined, 'message')
        ];
        this.boiler_plate_path = path.resolve('path', 'to', 'boilerplate.json');

       
        this.boiler_plates_manager.boilerplatesByLanguageAndType.returns([
            new Boilerplate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 'target', 'framework', {},
                this.boiler_plate_path, [], [])
        ]
        );
        
        this.bounded_contexts_manager = new BoundedContextsManager(this.boiler_plates_manager, logger);
    }
 }