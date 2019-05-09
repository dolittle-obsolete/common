/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ClusterConfig } from './ClusterConfig';
import { Cluster } from './Cluster';

/**
 * Represents a parser for {Config}
 *
 * @export
 * @class ConfigParser
 */
export class ConfigParser {
    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | any} configuration String or object holding configuration
     * @returns {ClusterConfig}
     */
    parse(configuration: string | any): ClusterConfig {
        if (typeof configuration == 'undefined') configuration = {};
        if (typeof configuration == 'string') configuration = JSON.parse(configuration);


        let config = new ClusterConfig();
        if (configuration.clusters) {
            configuration.clusters.forEach((cl: any) => config.clusters.push(Object.assign(new Cluster, cl)));
        }
        let clusterMatchingConfigurationName = config.clusters.find(cl => cl.name === configuration.current);
        if (clusterMatchingConfigurationName) {
            config.current = clusterMatchingConfigurationName;
        }

        return config;
    }
}
