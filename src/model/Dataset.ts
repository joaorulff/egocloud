import { IRawWorldPointCloud } from "./interfaces/raw/raw";
import { WorldPointCloud } from "./renderables/world/WorldPointCloud";

export class Dataset {

    // world point cloud
    public worldPointCloud!: WorldPointCloud;

    // streams
    public streams: { [name: string]: number } = {};

    constructor( rawWorldPointCloud: IRawWorldPointCloud ){

        // saving world point cloud
        this.worldPointCloud = new WorldPointCloud( 'world', rawWorldPointCloud.positions, rawWorldPointCloud.colors, rawWorldPointCloud.normals );

    }

}