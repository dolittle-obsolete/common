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
import Conf from 'conf';
import path from 'path';
/**
 * Represents a config file that's used as a cache storage for the tooling.
 *
 * The configuration file should be stored at the root of the scope folder of the running tooling package.
 *
 * @export
 * @class CacheConfig
 * @extends {Conf}
 */
var CacheConfig = /** @class */ (function (_super) {
    __extends(CacheConfig, _super);
    /**
     * Creates an instance of {CacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} nodeModulesFolder The path of the global node_modules folder
     * @param {{[key: string]: any}} defaultObj
     * @memberof CacheConfig
     */
    function CacheConfig(configName, nodeModulesFolder, defaultObj) {
        return _super.call(this, {
            projectName: '.dolittle',
            configName: configName,
            cwd: path.join(nodeModulesFolder, '@dolittle', '.dolittle'),
            defaults: defaultObj,
            projectSuffix: ''
        }) || this;
    }
    return CacheConfig;
}(Conf));
export { CacheConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FjaGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiLi9Tb3VyY2UvIiwic291cmNlcyI6WyJDYWNoZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O2dHQUdnRzs7Ozs7Ozs7Ozs7Ozs7QUFFaEcsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUV4Qjs7Ozs7Ozs7R0FRRztBQUNIO0lBQWlDLCtCQUFJO0lBQ2pDOzs7Ozs7T0FNRztJQUNILHFCQUFZLFVBQWtCLEVBQUUsaUJBQXlCLEVBQUUsVUFBbUM7ZUFDMUYsa0JBQU07WUFDRixXQUFXLEVBQUUsV0FBVztZQUN4QixVQUFVLFlBQUE7WUFDVixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO1lBQzNELFFBQVEsRUFBRSxVQUFVO1lBQ3BCLGFBQWEsRUFBRSxFQUFFO1NBQ3BCLENBQUM7SUFDTixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakJELENBQWlDLElBQUksR0FpQnBDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgQ29uZiBmcm9tICdjb25mJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb25maWcgZmlsZSB0aGF0J3MgdXNlZCBhcyBhIGNhY2hlIHN0b3JhZ2UgZm9yIHRoZSB0b29saW5nLiBcbiAqIFxuICogVGhlIGNvbmZpZ3VyYXRpb24gZmlsZSBzaG91bGQgYmUgc3RvcmVkIGF0IHRoZSByb290IG9mIHRoZSBzY29wZSBmb2xkZXIgb2YgdGhlIHJ1bm5pbmcgdG9vbGluZyBwYWNrYWdlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDYWNoZUNvbmZpZ1xuICogQGV4dGVuZHMge0NvbmZ9XG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZUNvbmZpZyBleHRlbmRzIENvbmYge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0NhY2hlQ29uZmlnfS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnTmFtZSBUaGUgbmFtZSBvZiB0aGUgY29uZmlndXJhdGlvbi4gQmVjb21lcyB0aGUgZmlsZW5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZU1vZHVsZXNGb2xkZXIgVGhlIHBhdGggb2YgdGhlIGdsb2JhbCBub2RlX21vZHVsZXMgZm9sZGVyXG4gICAgICogQHBhcmFtIHt7W2tleTogc3RyaW5nXTogYW55fX0gZGVmYXVsdE9ialxuICAgICAqIEBtZW1iZXJvZiBDYWNoZUNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ05hbWU6IHN0cmluZywgbm9kZU1vZHVsZXNGb2xkZXI6IHN0cmluZywgZGVmYXVsdE9iajogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0pIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICcuZG9saXR0bGUnLCBcbiAgICAgICAgICAgIGNvbmZpZ05hbWUsXG4gICAgICAgICAgICBjd2Q6IHBhdGguam9pbihub2RlTW9kdWxlc0ZvbGRlciwgJ0Bkb2xpdHRsZScsICcuZG9saXR0bGUnKSxcbiAgICAgICAgICAgIGRlZmF1bHRzOiBkZWZhdWx0T2JqLFxuICAgICAgICAgICAgcHJvamVjdFN1ZmZpeDogJydcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==