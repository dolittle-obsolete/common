/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function coreFromJson(obj) {
    return new Core(obj.language, obj.entryPoint);
}
/**
  * Represents a Bounded Context's core configuration
  */
export class Core
{
    #language;
    #entryPoint;
    /**
      * Instantiates an instance of Core
      * @param {string} language 
      * @param {string} entryPoint
      */
    constructor (language, entryPoint) {
        this.#language = language;
        this.#entryPoint = entryPoint;
        
    }
    /**
      * Gets the programming language
      * @returns {string} The string representing the programming language
      */
    get language() {
        return this.#language;
    }
    /**
     * The entry point of the bounded context's Core.  A relative path to the folder
     *
     * @readonly
     * @memberof Core
     */
    get entryPoint() {
        return this.#entryPoint;
    }

    toJson() {
        return {
            language: this.#language,
            entryPoint: this.#entryPoint
        };
    }
}