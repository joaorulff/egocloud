import { VoxelGrid } from "./voxel/VoxelGrid";
import { PointCloud } from "./renderables/PointCloud";
import { VoxelCloud } from "./renderables/VoxelCloud";
import { LineSet } from "./renderables/LineSet";
import { Line } from "./interfaces/Line.interface";
export declare class Dataset {
    voxelGrid: VoxelGrid;
    pointClouds: {
        [name: string]: PointCloud;
    };
    heatmaps: {
        [name: string]: VoxelCloud;
    };
    lineSets: {
        [name: string]: LineSet;
    };
    boundingBoxes: {
        [name: string]: THREE.Object3D;
    };
    constructor();
    get_object_meta(type: string, name: string, index: number): any;
    get_available_objects(): {
        [type: string]: string[];
    };
    add_point_cloud(name: string, points: number[][], normals: number[][], colors: number[][], meta?: any[], interactive?: boolean, grid?: boolean): void;
    add_line_set(name: string, lines: Line[], colors: number[][], meta: any[]): void;
    add_heatmap(name: string, color: number[]): void;
}
