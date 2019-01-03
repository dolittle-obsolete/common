/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Core, coreFromJson } from './Core';

export function boundedContextFromJson(obj, path) {
    return new BoundedContext(obj.application, obj.boundedContext, obj.boundedContextName, coreFromJson(obj.core), path);
}
/**
  * Represents a Bounded Context
  */
export class BoundedContext
{
    #application;
    #boundedContext;
    #boundedContextName;
    #core;
    #path;
    /**
      * Instantiates an instance of BoundedContext
      * @param {string} application 
      * @param {string} boundedContext 
      * @param {string} boundedContextName 
      * @param {Core} core 
      * @param {string} path
      */
    constructor (application, boundedContext, boundedContextName, core, path) {
        this.#application = application;
        this.#boundedContext = boundedContext;
        this.#boundedContextName = boundedContextName;
        this.#core = core;
        this.#path = path;
        
    }
    /**
      * Gets the application GUID
      * @returns {string} The GUID of the Application
      */
    get application() {
        return this.#application;
    }
    /**
      * Gets the bounded context GUID
      * @returns {string} The GUID of the bounded context
      */
    get boundedContext() {
        return this.#boundedContext;
    }
    /**
      * Gets the name of the bounded context
      * @returns {string} Bounded Context name
      */
    get boundedContextName() {
        return this.#boundedContextName;
    }
    /**
      * Gets the core configuration 
      * @returns {Core}
      */
    get core() {
        return this.#core;
    }
    /**
      * Gets the path of the bounded context configuration file
      * @returns {string}
      */
    get path() {
        return this.#path;
    }
}