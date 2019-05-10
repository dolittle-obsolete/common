import { CacheConfig } from './CacheConfig';
/**
 * Represents the cached project configuration file for the tooling
 *
 * @export
 * @class ProjectConfig
 * @extends {CacheConfig}
 */
export declare class ProjectConfig extends CacheConfig {
    /**
     * Creates an instance of {ProjectConfig}.
     * @param {string} nodeModulesFolder
     * @memberof ProjectConfig
     */
    constructor(nodeModulesFolder: string);
}
