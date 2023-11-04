import * as THREE from 'three';
import { Line } from '../interfaces/Line.interface';
export declare class SceneHighlights {
    points: number[][];
    lines: number[][][];
    currentHighlights: THREE.Object3D[];
    constructor();
    highlight_object(objectType: string, position: number[] | Line, scene: THREE.Scene): void;
    clear_current_highlight(scene: THREE.Scene): void;
    private highlight_sphere;
    private highlight_line;
}
