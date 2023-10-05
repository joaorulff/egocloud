import * as THREE from 'three';

export class SceneHighlights {

    public points: number[][] = [];
    public lines: number[][][] = [];

    // current highlights
    public currentHighlights: THREE.Object3D[] = [];

    constructor(){}

    public highlight_object( objectType: string, position: number[] | number[][], scene: THREE.Scene ): void {

        // clear previous highlights
        this.currentHighlights.forEach( (object: THREE.Object3D) => {
            scene.remove( object );
        })

        if( objectType === 'point' ){

            this.highlight_sphere( objectType, <number[]>position, scene );
            return;
        }


    }

    private clear_current_highlight(): void {}

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

    private highlight_line(): void {}

}