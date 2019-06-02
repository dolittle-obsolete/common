/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { OnStdCallback } from '@dolittle/tooling.common.packages';
import { IBoilerplates } from '../index';

/**
 * Lists the boilerplates used by the tooling
 *
 * @param {IBoilerplate} _boilerplates 
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onSuccess] Optional callback for dealing the text output when the operation was successful
 * @param {OnStdCallback} [onEachBoilerplate] Optional callback for dealing the text output for each boilerplate in the listing
 * @param {OnStdCallback} [onNoBoilerplates] Optional callback for dealing the text output when there are no boilerplates
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 * 
 */
export async function listBoilerplatesInUse(_boilerplates: IBoilerplates, onStdOut?: OnStdCallback, onSuccess?: OnStdCallback, onEachBoilerplate?: OnStdCallback, onNoBoilerplates?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifSuccess = (data: string) => onSuccess? onSuccess(data) : {};
    let ifEachBoilerplate = (data: string) => onEachBoilerplate? onEachBoilerplate(data) : {};
    let ifNoBoilerplates = (data: string) => onNoBoilerplates? onNoBoilerplates(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    ifStdOut('Listing boilerplates in use:\n');
    try {
        let boilerplates = _boilerplates.boilerplates;
        let numBoilerplates = boilerplates.length;
        if (numBoilerplates > 0) {
            ifSuccess(`There are ${numBoilerplates} in use`);
            boilerplates.forEach(boilerplate => {
                ifEachBoilerplate(
                    `${boilerplate.name}: 
Type: ${boilerplate.type}
Language: ${boilerplate.language}
Description: ${boilerplate.description}
`);
            });
        }
        else ifNoBoilerplates(`There are no boilerplates in use.
Do you have any installed? Use 'dolittle boilerplates init' to initialize the boilerplates system

Use 'dolittle boilerplates online' to discover what's available on npm.
Or use 'dolittle boilerplates dolittle' to discover boilerplates that the Dolittle teams has made available on npm`);

    } catch(error) {
        ifStdErr(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}