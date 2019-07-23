/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IFileSystem } from "../../index";

export class a_file_system {
    file_system: IFileSystem;
    constructor() {
        this.file_system = {
            copy: sinon.stub()
        }
    }
}