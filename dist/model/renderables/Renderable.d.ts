import * as THREE from 'three';
export declare abstract class Renderable {
    id: string;
    constructor(id: string);
    abstract get_renderables(): THREE.Object3D;
}
