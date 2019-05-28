/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplates, IBoilerplates, ArtifactsBoilerplate, Scripts, ArtifactTemplates } from "../../../index";
export class a_single_artifacts_boilerplate {
    constructor() {
        this.boilerplate_objects = [new ArtifactsBoilerplate('language', 'name', 'description', 'type', [], 'namespace', new Scripts([], [], [], {}), 'path', {}, {})];
        this.boilerplates_loader = {
            boilerplates: this.boilerplate_objects
        }
        this.boilerplates = new Boilerplates(this.boilerplates_loader, {}, {}, {});
        this.artifact_templates = new ArtifactTemplates(this.boilerplates, {}, {}, {}, {});
    }
}