/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandExecutor, CommandContext } from './../../internal';
import { Substitute } from '@fluffy-spoon/substitute';
import sinon from 'sinon';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

describe('when executing command', () => {
    const command_executor = new CommandExecutor(Substitute.for<ILoggers>());
    const command = {name: 'name', action: sinon.stub()};


    command_executor.execute(command as any, Substitute.for<CommandContext>(), Substitute.for<IDependencyResolvers>());

    it('should call action on command', () => command.action.should.be.calledOnce);
});
