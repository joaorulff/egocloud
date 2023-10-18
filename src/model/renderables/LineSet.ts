import { VoxelCube } from "../interfaces/VoxelCube.interface";
import { Renderable } from "./Renderable";
import * as THREE from 'three';
import { Line } from "../interfaces/Line.interface";

export class LineSet extends Renderable {

    constructor( public name: string, public lines: Line[], public colors: number[][], public meta: any[] ){
        super(name);
    }

    public get_renderables(): THREE.Object3D {

        // creating group of highlighted objects
        const group: THREE.Group = new THREE.Group();
        group.name = this.name;
        

        for( let i = 0; i < this.lines.length; i++ ){

            const origin: THREE.Vector3 = new THREE.Vector3( this.lines[i].origin[0], this.lines[i].origin[1], this.lines[i].origin[2] );
            const destination: THREE.Vector3 = new THREE.Vector3( this.lines[i].destination[0], this.lines[i].destination[1], this.lines[i].destination[2] );

            // Direction highlight
            const lineColor: THREE.Color = new THREE.Color( this.colors[i][0], this.colors[i][1], this.colors[i][2] );
            const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2, transparent: true, opacity: 0.5 });
            const lineGeometry = new THREE.BufferGeometry().setFromPoints( [origin, destination] );

            const line: THREE.Line = new THREE.Line( lineGeometry, lineMaterial );

            group.add(line);
        }

        return group;
    }

}