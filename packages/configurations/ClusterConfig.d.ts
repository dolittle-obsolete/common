import { Cluster } from './Cluster';
export declare class ClusterConfig {
    /**
     * Array of all the configured clusters
     * @type {Cluster[]}
     */
    clusters: Cluster[];
    /**
     * Current cluster being used
     * @type {Cluster}
     */
    current: Cluster;
}
