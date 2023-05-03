export declare abstract class PointCloud {
    name: string;
    points: number[][];
    colors: number[][];
    normals: number[][];
    timestamps: number[];
    extent: number[][];
    constructor(name: string, points: number[][], colors: number[][], normals: number[][], timestamps: number[]);
    get_buffer_positions(): [number[], number[], number[]];
}
