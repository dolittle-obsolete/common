/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {areas} from '@dolittle/tooling.common.utilities';

const dependencyTypes = [
    'discover',
    'userInput'
];
const discoverTypes = [
    'namespace',
    'file',
    'fileContent',
    'multipleFiles',
    'multipleFileContents'
];
const userInputTypes = [
    'argument',
    'input',
    'chooseOne',
    'chooseMultiple'
];

function throwIfInvalidDependency(type: string, discoverType?: string, userInputType?: string, milestone?: RegExp, withNamespace?: boolean) {
    let throwError = false;
    let errors = [];
    if (!dependencyTypes.includes(type)) {
        throwError = true;
        errors.push(`Invalid dependency type '${type}'`);
    }
    if (discoverType !== undefined && !discoverTypes.includes(discoverType)) {
        throwError = true;
        errors.push(`Invalid discover type '${discoverType}'`);
    }
    if (userInputType !== undefined && !userInputTypes.includes(userInputType)) {
        throwError = true;
        errors.push(`Invalid user input type '${userInputType}'`);
    }

    if (type === 'discover' && (discoverType === undefined || discoverType === '') ) {
        throwError = true;
        errors.push('A discovery type must be given when dependency type is \'discover\'');
    }
    if (type === 'userInput' && (userInputType === undefined || userInputType === '') ) {
        throwError = true;
        errors.push('A user input type must be given when dependency type is \'userInput\'');
    }

    if ((withNamespace || discoverType === 'namespace') && (milestone === undefined || milestone.source === '') )
    {
        throwError = true;
        errors.push('When a namespace should be discovered a milestone pattern must be given.');
    }

    if (throwError) {
        throw new Error(`Invalid dependency. Errors:\n\t${errors.join('\n\t')}`);
    }
}
function throwIfInvalidArea(fromArea?: string) {
    if (fromArea !== undefined && !areas.includes(fromArea)) {
        throw new Error(`Invalid area ${fromArea}`);
    }
}
/**
 * Represents the configuration of a dependency
 *
 * @export
 * @class Dependency
 */
export class Dependency {
    /**
     * Creates a {Dependency}
     *
     * @static
     * @param {any} obj
     * @param {string} name
     * @returns {Dependency}
     * @memberof Dependency
     */
    static fromJson(obj: any, name: string): Dependency {
        return new Dependency(obj.description, name, obj.type, obj.discoverType, obj.userInputType, obj.choices,
            obj.promptMessage, obj.customInput, obj.withNamespace, obj.milestone, obj.fileMatch, obj.contentMatch, obj.fromArea);
    }
    /**
     * Creates an instance of Dependency.
     * @param {string} description
     * @param {string} name
     * @param {string} type
     * @param {string} discoverType
     * @param {string} userInputType
     * @param {any[]}  choices
     * @param {string} promptMessage
     * @param {string} customInput
     * @param {boolean} withNamespace
     * @param {string} milestone
     * @param {string} fileMatch
     * @param {string} contentMatch
     * @param {string} fromArea
     * @memberof Dependency
     */
    constructor (description: string, name: string, type: string, discoverType?: string, userInputType?: string, choices?: any[], 
            promptMessage?: string, customInput?: string, withNamespace?: boolean, milestone?: string, fileMatch?: string, 
            contentMatch?: string, fromArea?: string ) {
        this.description = description;
        this.name = name;
        this.type = type;
        this.discoverType = discoverType;
        this.userInputType = userInputType;
        this.choices = choices;
        this.promptMessage = promptMessage;
        this.customInput = customInput;
        this.withNamespace = withNamespace;
        this.milestone = milestone? new RegExp(milestone) : undefined;
        this.fileMatch = fileMatch ? new RegExp(fileMatch) : undefined;
        this.contentMatch = contentMatch? new RegExp(contentMatch) : undefined;
        this.fromArea = fromArea;

        throwIfInvalidDependency(type, discoverType, userInputType, this.milestone, withNamespace);
        throwIfInvalidArea(fromArea);
    }
    /**
     * Gets the description of the dependency
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly description: string;
    /**
     * Gets the name of the dependency
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly name: string;
    /**
     * Gets the type of the dependency. Either 'discover' or 'userInput'
     * 
     * The 'discover' dependency type tells the system that it should find the dependency somehow, normally by searching through the file system. A 'discover' could also mean to discover multiple choices and then make it the user's responsibility to choose. If so the dependency should also have a 'userInputType' parameter for how the user can choose.
     * 
     * The 'userInput' dependency type tells the system that this dependency is supplied by the user
     * 
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly type: string;
    /**
     * Gets the discover type of the dependency, it dictates what should be discovered and how it will be discovered.
     * 
     * The 'namespace' discovery type tries to resolve a namespace for an artifact by going upwards in the file system and finding a file matching the 'milestone' parameter and then creating the namespace by joining folder names with '.'. 
     * 
     * The 'file' discovery type tries to find a file that matches the given 'fileMatch' parameter and sets the file name as the dependency. If the 'contentMatch' parameter is also given then the system will match the file by the fileMatch and contentMatch
     * 
     * The 'fileContent' discovery type does the same as the 'file' type, but the dependency is the file's content, not its file name.
     * 
     * The 'multipleFiles' discovery type does the same as the 'file' type, but it discovers multiple files instead of just one.
     * 
     * The 'multipleFileContents' discovery type does the same as the 'fileContent' type, but it discovers multiple files instead of just one.
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly discoverType?: string;
    /**
     * Gets the user input type of the dependency, it defines how the user should be prompted.
     * 
     * The 'argument' user input type is a CLI specific thing defining user input that should be arguments in a command
     * 
     * The 'input' user input type prompts the user for input. Use the 'promptMessage' property for 
     * 
     * The 'chooseOne' user input type prompts the user to choose one alternative. The choices can come from a 'discovery' or from the 'choices' property
     * 
     * The 'chooseMultiple' user input type prompts the user to choose one or more alternatives. The choices can come from a 'discovery' or from the 'choices' property
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly userInputType?: string;
    /**
     * Gets the list of choices for a user input prompt
     *
     * @type {any[]}
     * @readonly
     * @memberof Dependency
     */
    readonly choices?: any[];
    /**
     * Gets the message that the user is prompted with
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly promptMessage?: string;
    /**
     * Gets the custom input string that is the alternative string of a custom input when the user is prompted to choose between alternatives.
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly customInput?: string;
    /**
     * Gets whether or not to generate namespaces for each file that's discovered. 
     *
     * @type {boolean}
     * @readonly
     * @memberof Dependency
     */
    readonly withNamespace?: boolean;
    /**
     * Gets the regex that represents the filename of a milestone that's used to determine a namespace.
     *
     * @type {RegExp}
     * @readonly
     * @memberof Dependency
     */
    readonly milestone?: RegExp;
    /**
     * Gets the regex that represents the filename pattern of the file to match
     *
     * @type {RegExp}
     * @readonly
     * @memberof Dependency
     */
    readonly fileMatch?: RegExp;
    /**
     * Gets the regex that represents the content pattern of the file to match
     *
     * @type {RegExp}
     * @readonly
     * @memberof Dependency
     */
    readonly contentMatch?: RegExp;
    /**
     * Gets the area a file discovery should start searching from.
     *
     * @type {string}
     * @readonly
     * @memberof Dependency
     */
    readonly fromArea?: string;
}