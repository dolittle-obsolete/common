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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = __importDefault(require("conf"));
var path_1 = __importDefault(require("path"));
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
            cwd: path_1.default.join(nodeModulesFolder, '@dolittle', '.dolittle'),
            defaults: defaultObj,
            projectSuffix: ''
        }) || this;
    }
    return CacheConfig;
}(conf_1.default));
exports.CacheConfig = CacheConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FjaGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiLi9Tb3VyY2UvIiwic291cmNlcyI6WyJDYWNoZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztnR0FHZ0c7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVoRyw4Q0FBd0I7QUFDeEIsOENBQXdCO0FBRXhCOzs7Ozs7OztHQVFHO0FBQ0g7SUFBaUMsK0JBQUk7SUFDakM7Ozs7OztPQU1HO0lBQ0gscUJBQVksVUFBa0IsRUFBRSxpQkFBeUIsRUFBRSxVQUFtQztlQUMxRixrQkFBTTtZQUNGLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFVBQVUsWUFBQTtZQUNWLEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7WUFDM0QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsYUFBYSxFQUFFLEVBQUU7U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBaUMsY0FBSSxHQWlCcEM7QUFqQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCBDb25mIGZyb20gJ2NvbmYnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbmZpZyBmaWxlIHRoYXQncyB1c2VkIGFzIGEgY2FjaGUgc3RvcmFnZSBmb3IgdGhlIHRvb2xpbmcuIFxuICogXG4gKiBUaGUgY29uZmlndXJhdGlvbiBmaWxlIHNob3VsZCBiZSBzdG9yZWQgYXQgdGhlIHJvb3Qgb2YgdGhlIHNjb3BlIGZvbGRlciBvZiB0aGUgcnVubmluZyB0b29saW5nIHBhY2thZ2UuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENhY2hlQ29uZmlnXG4gKiBAZXh0ZW5kcyB7Q29uZn1cbiAqL1xuZXhwb3J0IGNsYXNzIENhY2hlQ29uZmlnIGV4dGVuZHMgQ29uZiB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7Q2FjaGVDb25maWd9LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWdOYW1lIFRoZSBuYW1lIG9mIHRoZSBjb25maWd1cmF0aW9uLiBCZWNvbWVzIHRoZSBmaWxlbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlTW9kdWxlc0ZvbGRlciBUaGUgcGF0aCBvZiB0aGUgZ2xvYmFsIG5vZGVfbW9kdWxlcyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge3tba2V5OiBzdHJpbmddOiBhbnl9fSBkZWZhdWx0T2JqXG4gICAgICogQG1lbWJlcm9mIENhY2hlQ29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTmFtZTogc3RyaW5nLCBub2RlTW9kdWxlc0ZvbGRlcjogc3RyaW5nLCBkZWZhdWx0T2JqOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJy5kb2xpdHRsZScsIFxuICAgICAgICAgICAgY29uZmlnTmFtZSxcbiAgICAgICAgICAgIGN3ZDogcGF0aC5qb2luKG5vZGVNb2R1bGVzRm9sZGVyLCAnQGRvbGl0dGxlJywgJy5kb2xpdHRsZScpLFxuICAgICAgICAgICAgZGVmYXVsdHM6IGRlZmF1bHRPYmosXG4gICAgICAgICAgICBwcm9qZWN0U3VmZml4OiAnJ1xuICAgICAgICB9KTtcbiAgICB9XG59Il19