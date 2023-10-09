import * as THREE from 'three';
export declare class SceneHighlights {
    points: number[][];
    lines: number[][][];
    currentHighlights: THREE.Object3D[];
    constructor();
    highlight_object(objectType: string, position: number[] | number[][], scene: THREE.Scene): void;
    private clear_current_highlight;
    private highlight_sphere;
    private highlight_line;
}
