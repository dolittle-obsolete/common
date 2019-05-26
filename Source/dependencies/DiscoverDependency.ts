/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {areas} from '@dolittle/tooling.common.utilities';
import {Dependency, IDiscoverDependency} from './index';

export const namespaceDiscoverType = 'namespace';
export const fileDiscoverType = 'file';
export const FileContentDiscoverType = 'fileContent';
export const multipleFilesDiscoverType = 'multipleFiles';
export const multipleFileContentsDiscoverType = 'multipleFileContents';

export const dependencyDiscoverTypes = [
    namespaceDiscoverType,
    fileDiscoverType,
    FileContentDiscoverType,
    multipleFilesDiscoverType,
    multipleFileContentsDiscoverType
];

/**
 * Represents an implementation of {IDiscoverDependency} for the configuration of a dependency with only a 'discover' element
 *
 * @export
 * @class DiscoverDependency
 * @extends {Dependency}
 * @implements {IDiscoverDependency}
 */
export class DiscoverDependency extends Dependency implements IDiscoverDependency  {
    
    static throwIfInvalidDiscoverDependency(discoverType: string, withNamespace?: boolean, milestone?: RegExp, fileMatch?: RegExp) {
        let throwError = false;
        let errors = [];

        if (discoverType === undefined || discoverType === '') {
            throwError = true;
            errors.push('A discovery type must be given when dependency type is \'discover\'');
        }
        if (discoverType !== undefined && !dependencyDiscoverTypes.includes(discoverType)) {
            throwError = true;
            errors.push(`Invalid discover type '${discoverType}'`);
        }
        if ((withNamespace || discoverType === 'namespace') && (milestone === undefined || milestone.source.trim() === '')) {
            throwError = true;
            errors.push('When a namespace should be discovered a milestone pattern must be given.');
        }
        if (dependencyDiscoverTypes.slice(1).includes(discoverType) && (fileMatch === undefined || fileMatch.source.trim() === '')) {
            throwError = true;
            errors.push(`The 'fileMatch' property must be given when 'discoverType' is one of: [${dependencyDiscoverTypes.slice(1).join(', ')}] `)
        } 
        if (throwError) {
            throw new Error(`Invalid dependency. Errors:\n\t${errors.join('\n\t')}`);
        }
    }
    /**
     * Instantiates an instance of {DiscoverDependency}.
     * @param {string} name
     * @param {string} description
     * @param {string} discoverType
     * @param {boolean} [withNamespace]
     * @param {string} [milestone]
     * @param {string} [fileMatch]
     * @param {string} [contentMatch]
     * @param {string} [fromArea]
     */
    constructor (name: string, description: string, discoverType: string, withNamespace?: boolean, milestone?: string, fileMatch?: string, 
            contentMatch?: string, fromArea?: string ) {
        super(name, description, 'discover');
        this.discoverType = discoverType;
        this.withNamespace = withNamespace;
        this.milestone = milestone? new RegExp(milestone) : undefined;
        this.fileMatch = fileMatch? new RegExp(fileMatch) : undefined;
        this.contentMatch = contentMatch? new RegExp(contentMatch) : undefined;
        this.fromArea = fromArea;

        DiscoverDependency.throwIfInvalidDiscoverDependency(discoverType, withNamespace, this.milestone, this.fileMatch);
        this.throwIfInvalidArea();
    }
    readonly discoverType: string;

    readonly withNamespace?: boolean;
    
    readonly milestone?: RegExp;
    
    readonly fileMatch?: RegExp;
    
    readonly contentMatch?: RegExp;
    
    readonly fromArea?: string;

    private throwIfInvalidArea() {
        if (this.fromArea !== undefined && !areas.includes(this.fromArea)) {
            throw new Error(`Invalid fromArea '${this.fromArea}'`);
        }
    }
    
}