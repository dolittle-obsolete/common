import { ArtifactsManager } from "../../ArtifactsManager";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class an_artifacts_manager {
    constructor() {
        this.boiler_plates_manager = {
            boilerPlatesByLanguageAndType: sinon.stub(),
            createArtifactInstance: sinon.stub()
        };
        this.folders = {
            searchRecursive: sinon.stub()
        };
        this.file_system = {
            readFileSync: sinon.stub()
        };

        this.artifacts_manager = new ArtifactsManager(this.boiler_plates_manager, this.folders, this.file_system, logger);
    }
 }