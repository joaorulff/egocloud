import { IRawWorldPointCloud } from "./interfaces/raw/raw";
import { StreamPointCloud } from "./renderables/interactive/StreamPointCloud";
import { WorldPointCloud } from "./renderables/world/WorldPointCloud";

export class Dataset {

    // world point cloud
    public worldPointCloud!: WorldPointCloud;

    // streams
    public streamPointClouds: { [name: string]: StreamPointCloud } = {};

    constructor( rawWorldPointCloud: IRawWorldPointCloud ){

        // saving world point cloud
        this.worldPointCloud = new WorldPointCloud( 'world', rawWorldPointCloud.positions, rawWorldPointCloud.colors, rawWorldPointCloud.normals );

    }

    public add_point_cloud( name: string, points: number[][], normals: number[][], colors: number[][] ): void {

        const pointCloud: StreamPointCloud = new StreamPointCloud( name, points, normals, colors );
        this.streamPointClouds[name] = pointCloud;

    }


}