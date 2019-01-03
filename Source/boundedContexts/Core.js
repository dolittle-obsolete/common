/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function coreFromJson(obj) {
    return new Core(obj.language);
}
/**
  * Represents a Bounded Context's core configuration
  */
export class Core
{
    #language;
    /**
      * Instantiates an instance of Core
      * @param {string} language 
      */
    constructor (language) {
        this.#language = language;
    }
    /**
      * Gets the programming language
      * @returns {string} The string representing the programming language
      */
    get language() {
        return this.#language;
    }
}