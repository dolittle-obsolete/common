import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
import * as _helpers from './helpers';
import winston from 'winston';
export * from './Guid';
export * from './Folders';
export declare const helpers: typeof _helpers;
export declare const dolittleConfigDefault: {
    any: {
        concepts: string;
        domain: string;
        events: string;
        read: string;
    };
    csharp: {
        concepts: string;
        domain: string;
        events: string;
        read: string;
    };
};
export declare const fileSystem: typeof _fsExtra;
export declare const dolittleConfig: {
    [key: string]: any;
};
export declare const folders: Folders;
export declare const logger: winston.Logger;
