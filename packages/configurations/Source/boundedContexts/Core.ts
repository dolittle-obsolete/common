/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents the Bounded Context's core configuration
 *
 * @export
 * @class Core
 */
export class Core
{
    /**
     * Creates a {Core} object
     *
     * @static
     * @param {*} obj The raw core object from within then bounded-context.json
     * @returns {Core}
     * @memberof Core
     */
    static fromJson(obj: any): Core {
        return new Core(obj.language, obj.entryPoint);
    }
    /**
      * Instantiates an instance of Core
      * @param {string} language 
      * @param {string} entryPoint
      */
     constructor (language: string, entryPoint: string) {
        this.language = language;
        this.entryPoint = entryPoint;
        
    }

    /**
     * The programming language
     *
     * @type {string}
     * @memberof Core
     */
    readonly language: string;
    
    /**
     * The entry point of the bounded context's Core.  A relative path to the folder
     *
     * @type {string}
     * @memberof Core
     */
    readonly entryPoint: string;

    toJson() {
        return {
            language: this.language,
            entryPoint: this.entryPoint
        };
    }
}