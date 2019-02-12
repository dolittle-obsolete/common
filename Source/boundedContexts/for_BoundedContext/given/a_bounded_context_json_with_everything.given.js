/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_bounded_context_json_with_everything {
    constructor() {
        this.application = 'b406107e-0a10-fe54-8ae3-cd32d3408c17';
        this.boundedContext = '78b89381-da90-7682-9430-e216d7f802ae';
        this.boundedContextName = 'TheBoundedContext';
        this.coreLanguage = 'csharp';
        this.interactionLayerType = 'web';
        this.interactionLayerLanguage = 'javascript';
        this.interactionLayerFramework = 'aurelia';
        this.interactionLayerEntryPoint = 'Web';
        this.resourceTypeImplementation = 'MongoDB';
        this.boundedContextJson = 
            `{
                "application": "${this.application}",
                "boundedContext": "${this.boundedContext}",
                "boundedContextName": "${this.boundedContextName}",
                "core": {
                  "language": "${this.coreLanguage}"
                },
                "interaction": [
                  {
                    "type": "${this.interactionLayerType}",
                    "language": "${this.interactionLayerLanguage}",
                    "framework": "${this.interactionLayerFramework}",
                    "entryPoint": "${this.interactionLayerEntryPoint}"
                  }
                ],
                "resources": {
                  "readModels": {
                    "development": "${this.resourceTypeImplementation}",
                    "production": "${this.resourceTypeImplementation}"
                  },
                  "eventStore": {
                    "development": "${this.resourceTypeImplementation}",
                    "production": "${this.resourceTypeImplementation}"
                  }
                }
              }`;
    }
}