/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Cluster } from './Cluster';

export class ClusterConfig
{
    /**
     * Array of all the configured clusters
     * @type {Cluster[]}
     */
    clusters: Cluster[] = [];

    /**
     * Current cluster being used
     * @type {Cluster}
     */
    current!: Cluster;
}
