/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function scriptsFromJson(obj) {
    let creation = [...obj.creation];
    let build = [...obj.build];
    let run = [...obj.run];
    delete obj.creation;
    delete obj.build;
    delete obj.run;
    
    return new Scripts(creation, build, run, obj);
}
/**
  * Represents a Boilerplate's scripts
  */
export class Scripts
{
    #_creation;
    #_build;
    #_run;
    #_rest;

    /**
      * Instantiates an instance of {Scripts}
      * @param {string[]} creation 
      * @param {string[]} build
      * @param {string[]} run
      * @param {any} rest
      */
    constructor (creation, build, run, rest) {
        this.#_creation = creation;
        this.#_build = build;
        this.#_run = run;
        this.#_rest = rest;  
    }
    /**
     * Gets the creation scripts
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get creation() {return this.#_creation;}
    /**
     * Gets the build scripts
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get build() {return this.#_build;}
    /**
     * Gets the run scripts
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get run() {return this.#_run;}
    /**
     * Gets the rest of the scripts
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get rest() {return this.#_rest;}
    
    toJson() {
        let obj = {};
        obj.creation = this.creation;
        obj.build = this.build;
        obj.run = this.run;
        Object.keys(this.rest).forEach(_ => {
            obj[_] = this.rest[_];
        });
        return obj;
    }
}