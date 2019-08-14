/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import winston from 'winston';
import { ILoggers, Loggers, ConsoleLogger } from './index';

export const loggerFormat = winston.format;
export let loggers: ILoggers = new Loggers(new ConsoleLogger(false)); 
