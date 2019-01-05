/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ArtifactsManager } from "../../ArtifactsManager";
import { an_artifacts_manager } from "./an_artifacts_manager";
import { BoilerPlate } from "../../../boilerPlates/BoilerPlate";
import { Dependency } from "../../../dependencies/Dependency";
import { ArtifactTemplate } from "../../ArtifactTemplate";
const path = require('path');

export class a_system_that_has_a_boilerplate_with_a_dependency extends an_artifacts_manager{
    constructor() {
        super();
        this.artifact_type = 'the_artifact_type';
        this.language = 'csharp';
        
        this.dependencies = [
            new Dependency('description', 'name', 'userInput', undefined, 'input', undefined, 'message')
        ];
        this.boiler_plate_path = path.resolve('path', 'to', 'boilerplate.json');

        this.template_path = path.resolve('path', 'to', 'template','template.json'); 
        this.artifact_template = {
            name: 'name',
            type: this.artifact_type,
            area: 'read',
            description: 'some description',
            language: this.language,
            dependencies: [],
            includedFiles: [],
            path: this.template_path
        };
        this.boiler_plates_manager.boilerPlatesByLanguageAndType.returns([
            new BoilerPlate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 
                this.boiler_plate_path, [], [])
        ]
        );
        this.folders.searchRecursive.returns([
            this.template_path
        ]);
        this.file_system.readFileSync.returns(JSON.stringify(this.artifact_template));
        
        this.artifacts_manager = new ArtifactsManager(this.boiler_plates_manager, this.folders, this.file_system, logger);
    }
 }