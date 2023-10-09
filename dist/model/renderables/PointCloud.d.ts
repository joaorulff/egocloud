import * as THREE from 'three';
import { Renderable } from './Renderable';
export declare class PointCloud extends Renderable {
    name: string;
    points: number[][];
    normals: number[][];
    colors: number[][];
    extent: number[][];
    interactive: boolean;
    constructor(name: string, points: number[][], normals: number[][], colors: number[][]);
    set_interactivity(interactive: boolean): void;
    get_renderables(): THREE.Object3D[];
    get_buffer_positions(): [number[], number[], number[]];
}
