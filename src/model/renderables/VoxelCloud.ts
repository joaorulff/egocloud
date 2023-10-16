import { VoxelCube } from "../interfaces/VoxelCube.interface";
import { Renderable } from "./Renderable";
import * as THREE from 'three';

export class VoxelCloud extends Renderable {

    constructor( public name: string, public cubes: VoxelCube[], public colors: number[][], public opacities: number[] ){

        super(name);

    }

    public get_renderables(): THREE.Object3D {

        // creating group of highlighted objects
        const group: THREE.Group = new THREE.Group();
        group.name = this.name;

        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( this.cubes[0].width, this.cubes[0].height, this.cubes[0].depth );

        this.cubes.forEach( (cube: VoxelCube, index: number ) => {

            const color: THREE.Color = new THREE.Color( this.colors[index][0], this.colors[index][1], this.colors[index][2]  )
            const material = new THREE.MeshBasicMaterial({ color: color, opacity: this.opacities[index], transparent: true });
            const object = new THREE.Mesh( geometry, material );

            // positioning cube
            object.position.x = cube.center[0];  
            object.position.y = cube.center[1];
            object.position.z = cube.center[2];

            // adding cube to group
            group.add( object );

        })

        return group;
    }

}