/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getFileDirPath } from '@dolittle/tooling.common.files';
import path from 'path';
import { contentBoilerplateContentDirectoryName } from '../internal';

/**
 * Returns the content directory path for a content boilerplate
 *
 * @export
 * @param {string} boilerplatePath The path to the boilerplate.json
 * @returns {string}
 */
export function contentBoilerplateContentDirectoryFromPath(boilerplatePath: string) {
    return path.join(getFileDirPath(boilerplatePath), contentBoilerplateContentDirectoryName);
} 