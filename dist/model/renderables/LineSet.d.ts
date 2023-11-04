import { Renderable } from "./Renderable";
import * as THREE from 'three';
import { Line } from "../interfaces/Line.interface";
export declare class LineSet extends Renderable {
    name: string;
    lines: Line[];
    colors: number[][];
    meta: any[];
    constructor(name: string, lines: Line[], colors: number[][], meta: any[]);
    get_renderables(): THREE.Object3D;
}
