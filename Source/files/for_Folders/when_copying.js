/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Folders } from "../internal";

describe('When copying', () => {
    const destination = 'dest';
    const source = 'source';
    let file_system = {copy: sinon.stub()}
    let folders = new Folders(file_system);

    folders.copy(destination, source);
    
    it('Should call file system copy once', () => file_system.copy.calledOnce.should.be.true)
    it('Should call file system copy with the correct parameters', () => file_system.copy.calledWith(source, destination).should.be.true)
});