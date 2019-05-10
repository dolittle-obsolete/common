"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var ClusterConfig_1 = require("./ClusterConfig");
var Cluster_1 = require("./Cluster");
/**
 * Represents a parser for {Config}
 *
 * @export
 * @class ConfigParser
 */
var ConfigParser = /** @class */ (function () {
    function ConfigParser() {
    }
    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | any} configuration String or object holding configuration
     * @returns {ClusterConfig}
     */
    ConfigParser.prototype.parse = function (configuration) {
        if (typeof configuration == 'undefined')
            configuration = {};
        if (typeof configuration == 'string')
            configuration = JSON.parse(configuration);
        var config = new ClusterConfig_1.ClusterConfig();
        if (configuration.clusters) {
            configuration.clusters.forEach(function (cl) { return config.clusters.push(Object.assign(new Cluster_1.Cluster, cl)); });
        }
        var clusterMatchingConfigurationName = config.clusters.find(function (cl) { return cl.name === configuration.current; });
        if (clusterMatchingConfigurationName) {
            config.current = clusterMatchingConfigurationName;
        }
        return config;
    };
    return ConfigParser;
}());
exports.ConfigParser = ConfigParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnUGFyc2VyLmpzIiwic291cmNlUm9vdCI6Ii4vU291cmNlLyIsInNvdXJjZXMiOlsiQ29uZmlnUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztnR0FHZ0c7QUFDaEcsaURBQWdEO0FBQ2hELHFDQUFvQztBQUVwQzs7Ozs7R0FLRztBQUNIO0lBQUE7SUFzQkEsQ0FBQztJQXJCRzs7OztPQUlHO0lBQ0gsNEJBQUssR0FBTCxVQUFNLGFBQTJCO1FBQzdCLElBQUksT0FBTyxhQUFhLElBQUksV0FBVztZQUFFLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDNUQsSUFBSSxPQUFPLGFBQWEsSUFBSSxRQUFRO1lBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7UUFDakMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ3hCLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBTyxJQUFLLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO1NBQ3JHO1FBQ0QsSUFBSSxnQ0FBZ0MsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLE9BQU8sRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JHLElBQUksZ0NBQWdDLEVBQUU7WUFDbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztTQUNyRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDbHVzdGVyQ29uZmlnIH0gZnJvbSAnLi9DbHVzdGVyQ29uZmlnJztcbmltcG9ydCB7IENsdXN0ZXIgfSBmcm9tICcuL0NsdXN0ZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJzZXIgZm9yIHtDb25maWd9XG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENvbmZpZ1BhcnNlclxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyc2VyIHtcbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBKU09OIGZyb20gc3RyaW5nIGludG8gYSB7Y29uZmlnfSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgYW55fSBjb25maWd1cmF0aW9uIFN0cmluZyBvciBvYmplY3QgaG9sZGluZyBjb25maWd1cmF0aW9uXG4gICAgICogQHJldHVybnMge0NsdXN0ZXJDb25maWd9XG4gICAgICovXG4gICAgcGFyc2UoY29uZmlndXJhdGlvbjogc3RyaW5nIHwgYW55KTogQ2x1c3RlckNvbmZpZyB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlndXJhdGlvbiA9PSAndW5kZWZpbmVkJykgY29uZmlndXJhdGlvbiA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT0gJ3N0cmluZycpIGNvbmZpZ3VyYXRpb24gPSBKU09OLnBhcnNlKGNvbmZpZ3VyYXRpb24pO1xuXG5cbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDbHVzdGVyQ29uZmlnKCk7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uLmNsdXN0ZXJzKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLmNsdXN0ZXJzLmZvckVhY2goKGNsOiBhbnkpID0+IGNvbmZpZy5jbHVzdGVycy5wdXNoKE9iamVjdC5hc3NpZ24obmV3IENsdXN0ZXIsIGNsKSkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjbHVzdGVyTWF0Y2hpbmdDb25maWd1cmF0aW9uTmFtZSA9IGNvbmZpZy5jbHVzdGVycy5maW5kKGNsID0+IGNsLm5hbWUgPT09IGNvbmZpZ3VyYXRpb24uY3VycmVudCk7XG4gICAgICAgIGlmIChjbHVzdGVyTWF0Y2hpbmdDb25maWd1cmF0aW9uTmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLmN1cnJlbnQgPSBjbHVzdGVyTWF0Y2hpbmdDb25maWd1cmF0aW9uTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxufVxuIl19