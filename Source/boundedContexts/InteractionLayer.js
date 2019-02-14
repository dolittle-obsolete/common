/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function interactionLayerFromJson(obj) {
    return new Core(obj.language, obj.entryPoint);
}
/**
  * Represents one of the Bounded Context's interaction layers
  */
export class InteractionLayer
{
    #type;
    #language;
    #framework;
    #entryPoint;
    /**
      * Instantiates an instance of {InteractionLayer}
      * @param {string} type
      * @param {string} language
      * @param {string} framework 
      * @param {string} entryPoint
      */
    constructor (type, language, framework, entryPoint) {
        this.#type = type;
        this.#language = language;
        this.#framework = framework;
        this.#entryPoint = entryPoint;
        
    }
    /**
     * Gets the type of this interaction layer
     *
     * @readonly
     * @memberof InteractionLayer
     */
    get type() {
        return this.#type;
    }
    /**
      * Gets the programming language
      * @returns {string} The string representing the programming language
      */
    get language() {
        return this.#language;
    }
    /**
     * Gets the framework of this interaction layer
     *
     * @readonly
     * @memberof InteractionLayer
     */
    get framework() {
        return this.#framework;
    }
    /**
     * The entry point of this specific interaction layer.  A relative path to the folder
     *
     * @readonly
     * @memberof Core
     */
    get entryPoint() {
        return this.#entryPoint;
    }


    toJson() {
        return {
            type: this.#type,
            language: this.#language,
            framework: this.#framework,
            entryPoint: this.#entryPoint
        };
    }
}