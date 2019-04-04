/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function interactionLayerFromJson(obj) {
    return new InteractionLayer(obj.type, obj.language, obj.framework, obj.entryPoint);
}
/**
  * Represents one of the Bounded Context's interaction layers
  */
export class InteractionLayer
{
    #_type;
    #_language;
    #_framework;
    #_entryPoint;
    /**
      * Instantiates an instance of {InteractionLayer}
      * @param {string} type
      * @param {string} language
      * @param {string} framework 
      * @param {string} entryPoint
      */
    constructor (type, language, framework, entryPoint) {
        this.#_type = type;
        this.#_language = language;
        this.#_framework = framework;
        this.#_entryPoint = entryPoint;
        
    }
    /**
     * Gets the type of this interaction layer
     *
     * @readonly
     * @memberof InteractionLayer
     */
    get type() {
        return this.#_type;
    }
    /**
      * Gets the programming language
      * @returns {string} The string representing the programming language
      */
    get language() {
        return this.#_language;
    }
    /**
     * Gets the framework of this interaction layer
     *
     * @readonly
     * @memberof InteractionLayer
     */
    get framework() {
        return this.#_framework;
    }
    /**
     * The entry point of this specific interaction layer.  A relative path to the folder
     *
     * @readonly
     * @memberof Core
     */
    get entryPoint() {
        return this.#_entryPoint;
    }


    toJson() {
        return {
            type: this.type,
            language: this.language,
            framework: this.framework,
            entryPoint: this.entryPoint
        };
    }
}