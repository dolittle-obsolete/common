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
import { CacheConfig } from './CacheConfig';
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
}(CacheConfig));
export { ProjectConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIlByb2plY3RDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnR0FHZ0c7Ozs7Ozs7Ozs7Ozs7O0FBRWhHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUM7Ozs7OztHQU1HO0FBQ0g7SUFBbUMsaUNBQVc7SUFDMUM7Ozs7T0FJRztJQUNILHVCQUFZLGlCQUF5QjtlQUNqQyxrQkFBTSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFURCxDQUFtQyxXQUFXLEdBUzdDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBDYWNoZUNvbmZpZyB9IGZyb20gJy4vQ2FjaGVDb25maWcnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGNhY2hlZCBwcm9qZWN0IGNvbmZpZ3VyYXRpb24gZmlsZSBmb3IgdGhlIHRvb2xpbmdcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUHJvamVjdENvbmZpZ1xuICogQGV4dGVuZHMge0NhY2hlQ29uZmlnfVxuICovXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbmZpZyBleHRlbmRzIENhY2hlQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtQcm9qZWN0Q29uZmlnfS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZU1vZHVsZXNGb2xkZXJcbiAgICAgKiBAbWVtYmVyb2YgUHJvamVjdENvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGVNb2R1bGVzRm9sZGVyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoJ3Byb2plY3QnLCBub2RlTW9kdWxlc0ZvbGRlciwge30pO1xuICAgIH1cbn0iXX0=