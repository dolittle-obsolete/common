/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDiscoverDependency, DiscoverDependencyValidator, MissingField, fileDiscoverType, fileContentDiscoverType, multipleFileContentsDiscoverType, multipleFilesDiscoverType, CannotValidateDependency } from '../../internal';

/**
 * Represents a concrete implementation of {DiscoverDependencyValidator} that validates that a discover dependency has a 'fileMatch' when it's discovering files
 *
 * @export
 * @class DependencyHasFileMatchWhenDiscoveringFiles
 * @extends {DiscoverDependencyValidator}
 */
export class DiscoverDependencyHasFileMatchWhenDiscoveringFiles extends DiscoverDependencyValidator {

    canValidate(dependency: IDiscoverDependency) {
        return super.canValidate(dependency) && this.isDiscoveringFiles(dependency);
    }
    validate(dependency: IDiscoverDependency) {
        if (!this.canValidate(dependency)) throw new CannotValidateDependency(dependency, this);
        if (dependency.fileMatch === undefined || dependency.fileMatch.source.trim() === '') 
            throw new MissingField(dependency, 'fileMatch');
    }

    private isDiscoveringFiles(dependency: IDiscoverDependency) {
        return [
            fileDiscoverType, 
            fileContentDiscoverType, 
            multipleFilesDiscoverType, 
            multipleFileContentsDiscoverType].includes(dependency.discoverType)
    }
}
