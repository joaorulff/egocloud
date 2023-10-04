// external
import * as THREE from 'three';

export abstract class Renderable {

    constructor( public id: string ){}

    public abstract get_renderables(): THREE.Object3D[];

}