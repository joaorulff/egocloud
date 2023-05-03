import { IRawWorldPointCloud } from "./interfaces/raw/raw";
import { WorldPointCloud } from "./renderables/world/WorldPointCloud";
export declare class Dataset {
    worldPointCloud: WorldPointCloud;
    streams: {
        [name: string]: number;
    };
    constructor(rawWorldPointCloud: IRawWorldPointCloud);
}
