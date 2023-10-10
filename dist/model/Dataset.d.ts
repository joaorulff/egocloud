import { VoxelGrid } from "./voxel/VoxelGrid";
import { PointCloud } from "./renderables/PointCloud";
import { VoxelCloud } from "./renderables/VoxelCloud";
export declare class Dataset {
    voxelGrid: VoxelGrid;
    pointClouds: {
        [name: string]: PointCloud;
    };
    heatmaps: {
        [name: string]: VoxelCloud;
    };
    constructor();
    get_object_meta(type: string, name: string, index: number): any;
    add_point_cloud(name: string, points: number[][], normals: number[][], colors: number[][], meta?: any[], heatmap?: boolean, interactive?: boolean, grid?: boolean): void;
    private add_heatmap;
}
