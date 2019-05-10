/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import rc from 'rc';
import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
import * as _helpers from './helpers';
import winston from 'winston';
export * from './Guid';
export * from './Folders';
export var helpers = _helpers;
export var dolittleConfigDefault = {
    any: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    },
    csharp: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    }
};
export var fileSystem = _fsExtra;
export var dolittleConfig = rc('dolittle', dolittleConfigDefault);
export var folders = new Folders(fileSystem);
export var logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [
        new winston.transports.Console()
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9Tb3VyY2UvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O2dHQUdnRztBQUNoRyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxLQUFLLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUIsY0FBYyxRQUFRLENBQUM7QUFDdkIsY0FBYyxXQUFXLENBQUM7QUFDMUIsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRztJQUNqQyxHQUFHLEVBQUU7UUFDRCxRQUFRLEVBQUUsVUFBVTtRQUNwQixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ0osUUFBUSxFQUFFLFVBQVU7UUFDcEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsSUFBSSxFQUFFLE1BQU07S0FDZjtDQUNKLENBQUM7QUFDRixNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDcEUsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxNQUFNO0lBQ2IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUMxQjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7S0FDbkM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgcmMgZnJvbSAncmMnO1xuaW1wb3J0ICogYXMgX2ZzRXh0cmEgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgKiBhcyBfaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5cbmV4cG9ydCAqIGZyb20gJy4vR3VpZCc7XG5leHBvcnQgKiBmcm9tICcuL0ZvbGRlcnMnO1xuZXhwb3J0IGNvbnN0IGhlbHBlcnMgPSBfaGVscGVycztcblxuZXhwb3J0IGNvbnN0IGRvbGl0dGxlQ29uZmlnRGVmYXVsdCA9IHtcbiAgICBhbnk6IHtcbiAgICAgICAgY29uY2VwdHM6ICdDb25jZXB0cycsXG4gICAgICAgIGRvbWFpbjogJ0RvbWFpbicsXG4gICAgICAgIGV2ZW50czogJ0V2ZW50cycsXG4gICAgICAgIHJlYWQ6ICdSZWFkJ1xuICAgIH0sXG4gICAgY3NoYXJwOiB7XG4gICAgICAgIGNvbmNlcHRzOiAnQ29uY2VwdHMnLFxuICAgICAgICBkb21haW46ICdEb21haW4nLFxuICAgICAgICBldmVudHM6ICdFdmVudHMnLFxuICAgICAgICByZWFkOiAnUmVhZCdcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGZpbGVTeXN0ZW0gPSBfZnNFeHRyYTtcbmV4cG9ydCBjb25zdCBkb2xpdHRsZUNvbmZpZyA9IHJjKCdkb2xpdHRsZScsIGRvbGl0dGxlQ29uZmlnRGVmYXVsdCk7XG5leHBvcnQgY29uc3QgZm9sZGVycyA9IG5ldyBGb2xkZXJzKGZpbGVTeXN0ZW0pO1xuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICApLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICBdXG59KTsiXX0=