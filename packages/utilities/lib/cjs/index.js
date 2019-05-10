"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var rc_1 = __importDefault(require("rc"));
var _fsExtra = __importStar(require("fs-extra"));
var Folders_1 = require("./Folders");
var _helpers = __importStar(require("./helpers"));
var winston_1 = __importDefault(require("winston"));
__export(require("./Guid"));
__export(require("./Folders"));
exports.helpers = _helpers;
exports.dolittleConfigDefault = {
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
exports.fileSystem = _fsExtra;
exports.dolittleConfig = rc_1.default('dolittle', exports.dolittleConfigDefault);
exports.folders = new Folders_1.Folders(exports.fileSystem);
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [
        new winston_1.default.transports.Console()
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9Tb3VyY2UvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O2dHQUdnRztBQUNoRywwQ0FBb0I7QUFDcEIsaURBQXFDO0FBQ3JDLHFDQUFvQztBQUNwQyxrREFBc0M7QUFDdEMsb0RBQThCO0FBRTlCLDRCQUF1QjtBQUN2QiwrQkFBMEI7QUFDYixRQUFBLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFFbkIsUUFBQSxxQkFBcUIsR0FBRztJQUNqQyxHQUFHLEVBQUU7UUFDRCxRQUFRLEVBQUUsVUFBVTtRQUNwQixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ0osUUFBUSxFQUFFLFVBQVU7UUFDcEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsSUFBSSxFQUFFLE1BQU07S0FDZjtDQUNKLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDdEIsUUFBQSxjQUFjLEdBQUcsWUFBRSxDQUFDLFVBQVUsRUFBRSw2QkFBcUIsQ0FBQyxDQUFDO0FBQ3ZELFFBQUEsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxrQkFBVSxDQUFDLENBQUM7QUFDbEMsUUFBQSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUM7SUFDdkMsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUMxQixpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDekIsaUJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQzFCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7S0FDbkM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgcmMgZnJvbSAncmMnO1xuaW1wb3J0ICogYXMgX2ZzRXh0cmEgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgKiBhcyBfaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5cbmV4cG9ydCAqIGZyb20gJy4vR3VpZCc7XG5leHBvcnQgKiBmcm9tICcuL0ZvbGRlcnMnO1xuZXhwb3J0IGNvbnN0IGhlbHBlcnMgPSBfaGVscGVycztcblxuZXhwb3J0IGNvbnN0IGRvbGl0dGxlQ29uZmlnRGVmYXVsdCA9IHtcbiAgICBhbnk6IHtcbiAgICAgICAgY29uY2VwdHM6ICdDb25jZXB0cycsXG4gICAgICAgIGRvbWFpbjogJ0RvbWFpbicsXG4gICAgICAgIGV2ZW50czogJ0V2ZW50cycsXG4gICAgICAgIHJlYWQ6ICdSZWFkJ1xuICAgIH0sXG4gICAgY3NoYXJwOiB7XG4gICAgICAgIGNvbmNlcHRzOiAnQ29uY2VwdHMnLFxuICAgICAgICBkb21haW46ICdEb21haW4nLFxuICAgICAgICBldmVudHM6ICdFdmVudHMnLFxuICAgICAgICByZWFkOiAnUmVhZCdcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGZpbGVTeXN0ZW0gPSBfZnNFeHRyYTtcbmV4cG9ydCBjb25zdCBkb2xpdHRsZUNvbmZpZyA9IHJjKCdkb2xpdHRsZScsIGRvbGl0dGxlQ29uZmlnRGVmYXVsdCk7XG5leHBvcnQgY29uc3QgZm9sZGVycyA9IG5ldyBGb2xkZXJzKGZpbGVTeXN0ZW0pO1xuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICApLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICBdXG59KTsiXX0=