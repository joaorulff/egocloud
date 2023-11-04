import { VoxelCell } from "./VoxelCell";
export declare class VoxelGrid {
    xExtent: number[];
    yExtent: number[];
    zExtent: number[];
    private cellSize;
    constructor(xExtent: number[], yExtent: number[], zExtent: number[]);
    voxelMap: {
        [voxelIndex: string]: VoxelCell;
    };
    indexedPointClouds: {
        [name: string]: VoxelCell[];
    };
    update_voxel_grid(pointCloudName: string, points: number[][]): void;
    get_point_cloud_voxel_cells(pointCloudName: string, points?: number[][]): VoxelCell[];
}
