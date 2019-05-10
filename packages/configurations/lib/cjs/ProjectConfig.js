"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CacheConfig_1 = require("./CacheConfig");
/**
 * Represents the cached project configuration file for the tooling
 *
 * @export
 * @class ProjectConfig
 * @extends {CacheConfig}
 */
var ProjectConfig = /** @class */ (function (_super) {
    __extends(ProjectConfig, _super);
    /**
     * Creates an instance of {ProjectConfig}.
     * @param {string} nodeModulesFolder
     * @memberof ProjectConfig
     */
    function ProjectConfig(nodeModulesFolder) {
        return _super.call(this, 'project', nodeModulesFolder, {}) || this;
    }
    return ProjectConfig;
}(CacheConfig_1.CacheConfig));
exports.ProjectConfig = ProjectConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIlByb2plY3RDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7Ozs7Ozs7Ozs7Ozs7QUFFaEcsNkNBQTRDO0FBRTVDOzs7Ozs7R0FNRztBQUNIO0lBQW1DLGlDQUFXO0lBQzFDOzs7O09BSUc7SUFDSCx1QkFBWSxpQkFBeUI7ZUFDakMsa0JBQU0sU0FBUyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBbUMseUJBQVcsR0FTN0M7QUFUWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgQ2FjaGVDb25maWcgfSBmcm9tICcuL0NhY2hlQ29uZmlnJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBjYWNoZWQgcHJvamVjdCBjb25maWd1cmF0aW9uIGZpbGUgZm9yIHRoZSB0b29saW5nXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFByb2plY3RDb25maWdcbiAqIEBleHRlbmRzIHtDYWNoZUNvbmZpZ31cbiAqL1xuZXhwb3J0IGNsYXNzIFByb2plY3RDb25maWcgZXh0ZW5kcyBDYWNoZUNvbmZpZyB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7UHJvamVjdENvbmZpZ30uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVNb2R1bGVzRm9sZGVyXG4gICAgICogQG1lbWJlcm9mIFByb2plY3RDb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihub2RlTW9kdWxlc0ZvbGRlcjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCdwcm9qZWN0Jywgbm9kZU1vZHVsZXNGb2xkZXIsIHt9KTtcbiAgICB9XG59Il19