import { VoxelCube } from "../interfaces/VoxelCube.interface";
import { Renderable } from "./Renderable";
import * as THREE from 'three';
export declare class VoxelCloud extends Renderable {
    name: string;
    cubes: VoxelCube[];
    colors: number[][];
    opacities: number[];
    constructor(name: string, cubes: VoxelCube[], colors: number[][], opacities: number[]);
    get_renderables(): THREE.Object3D[];
}
