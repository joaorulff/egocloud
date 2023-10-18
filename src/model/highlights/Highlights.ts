import * as THREE from 'three';
import { Line } from '../interfaces/Line.interface';

export class SceneHighlights {

    public points: number[][] = [];
    public lines: number[][][] = [];

    // current highlights
    public currentHighlights: THREE.Object3D[] = [];

    constructor(){}

    public highlight_object( objectType: string, position: number[] | Line, scene: THREE.Scene ): void {

        if( objectType === 'point' ){
            this.highlight_sphere( objectType, <number[]>position, scene );
            return;
        } else if( objectType === 'line' ){
            this.highlight_line( <Line>position, scene );
        }

    }

    public clear_current_highlight( scene: THREE.Scene ): void {

        // clear previous highlights
        this.currentHighlights.forEach( (object: THREE.Object3D) => {
            scene.remove( object );
        })

    }

    private highlight_sphere( objectType: string, position: number[] , scene: THREE.Scene ): void {  

        // Point highlight
        const sphereColor: THREE.Color = new THREE.Color( 0.5, 0.5, 0.5 );
        const sphereGeometry = new THREE.SphereGeometry( 0.025, 15, 15 );
        const sphereMaterial = new THREE.MeshBasicMaterial( { color: sphereColor } );
        const pointVector: THREE.Vector3 = new THREE.Vector3( position[0], position[1], position[2] );

        // creating sphere mesh
        const sphereMesh: THREE.Mesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphereMesh.position.copy(pointVector);

        // adding to the queue of highlighted objects
        this.currentHighlights.push( sphereMesh );
        
        // adding to scene
        scene.add( sphereMesh );
    
    }

    private highlight_line( line: Line, scene: THREE.Scene ): void {

        const origin: THREE.Vector3 = new THREE.Vector3( line.origin[0], line.origin[1], line.origin[2] );
        const destination: THREE.Vector3 = new THREE.Vector3( line.destination[0], line.destination[1], line.destination[2] );

        // Direction highlight
        const lineColor: THREE.Color = new THREE.Color( 0.5, 0.5, 0.5 );
        const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2, transparent: true, opacity: 0.5 });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( [origin, destination] );

        const lineObj: THREE.Line = new THREE.Line( lineGeometry, lineMaterial );

        this.currentHighlights.push( lineObj );
        scene.add( lineObj );

    }

}