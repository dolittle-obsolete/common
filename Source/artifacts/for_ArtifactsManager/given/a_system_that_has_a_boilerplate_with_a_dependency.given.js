/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ArtifactsManager } from "../../ArtifactsManager";
import { BoilerPlate } from "../../../boilerPlates/BoilerPlate";
import { Dependency } from "../../../dependencies/Dependency";

const path = require('path');

export class a_system_that_has_a_boilerplate_with_a_dependency {
    constructor() {
        this.boiler_plates_manager = {
            boilerPlatesByLanguageAndType: sinon.stub(),
            createArtifactInstance: sinon.stub()
        };
        this.folders = {
            searchRecursive: sinon.stub(),
            searchFolderRegex: sinon.stub()
        };
        this.file_system = {
            readFileSync: sinon.stub()
        };

        this.artifacts_manager = new ArtifactsManager(this.boiler_plates_manager, this.folders, this.file_system, logger);

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
            dependencies: {}
        };
        this.boiler_plates_manager.boilerPlatesByLanguageAndType.returns([
            new BoilerPlate(this.language, 'some_artifact', 'some description', 'artifact', this.dependencies, 'target', 'frameWork', {},
                this.boiler_plate_path, [], [])
        ]
        );
        this.folders.searchRecursive.returns([
            this.template_path
        ]);
        this.folders.searchFolderRegex.returns([]);
        this.file_system.readFileSync.returns(JSON.stringify(this.artifact_template));
        
        this.artifacts_manager = new ArtifactsManager(this.boiler_plates_manager, this.folders, this.file_system, logger);
    }
 }