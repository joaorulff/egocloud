import { VoxelCube } from "../interfaces/VoxelCube.interface";
export declare class VoxelCell {
    xExtent: number[];
    yExtent: number[];
    zExtent: number[];
    private pointCloudIndices;
    constructor(xExtent: number[], yExtent: number[], zExtent: number[]);
    get_voxel_cube(): VoxelCube;
    is_point_cloud_indexed(pointCloudName: string): boolean;
    index_new_point(pointCloudName: string, pointIndex: number): void;
    get_point_cloud_size(name: string): number;
}
