import { ClusterConfig } from './ClusterConfig';
/**
 * Represents a parser for {Config}
 *
 * @export
 * @class ConfigParser
 */
export declare class ConfigParser {
    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | any} configuration String or object holding configuration
     * @returns {ClusterConfig}
     */
    parse(configuration: string | any): ClusterConfig;
}
