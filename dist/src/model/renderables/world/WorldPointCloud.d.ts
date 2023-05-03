import { PointCloud } from '../PointCloud';
export declare class WorldPointCloud extends PointCloud {
    name: string;
    points: number[][];
    colors: number[][];
    normals: number[][];
    constructor(name: string, points: number[][], colors: number[][], normals: number[][]);
}
