/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents one of the Bounded Context's interaction layers
 */
export class InteractionLayer
{

    /**
     * Creates an {InteractionLayer}
     *
     * @static
     * @param {any} obj The interaction layer object from within the bounded-context.json
     * @returns {InteractionLayer}
     */
    static fromJson(obj: any): InteractionLayer {
        return new InteractionLayer(obj.type, obj.language, obj.framework, obj.entryPoint);
    }

    /**
      * Instantiates an instance of {InteractionLayer}
      * @param {string} type
      * @param {string} language
      * @param {string} framework 
      * @param {string} entryPoint
      */
     constructor (type: string, language: string, framework: string, entryPoint: string) {
        this.type = type;
        this.language = language;
        this.framework = framework;
        this.entryPoint = entryPoint;
    }

    /**
     * The type of this interaction layer
     *
     * @type {string}
     */
    readonly type: string;

    /**
     * The programming language
     *
     * @type {string}
     */
    readonly language: string;

    /**
     * The framework of this interaction layer
     *
     * @type {string}
     */
    readonly framework: string;
    
    /**
     * The entry point of this specific interaction layer.  A relative path to the folder 
     *
     * @type {string}
     */
    readonly entryPoint: string;

    toJson() {
        return {
            type: this.type,
            language: this.language,
            framework: this.framework,
            entryPoint: this.entryPoint
        };
    }
}