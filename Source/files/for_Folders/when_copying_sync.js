/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Folders } from "../internal";


describe('When copying sync', () => {
    const destination = 'dest';
    const source = 'source';
    let file_system = {copySync: sinon.stub()}
    let folders = new Folders(file_system);
    before(async () => {
        folders.copySync(destination, source);
    });
    
    it('Should call file system copy once', () => file_system.copySync.calledOnce.should.be.true)
    it('Should call file system copy with correct parameters', () => file_system.copySync.calledWith(source, destination).should.be.true)
});