import * as THREE from 'three';
import { Scene } from 'three';
import { MousePosition } from '../interfaces/MousePosition.interface';

export class Raycaster {

    private rayCaster!: THREE.Raycaster;

    // Mouse pointer
    public pointer: THREE.Vector2 = new THREE.Vector2();
    public pointerEvent!: MouseEvent;

    constructor( public scene: Scene ){

        // initializing ray caster
        this.rayCaster = new THREE.Raycaster();
        this.rayCaster.params.Points!.threshold = 0.015;
    }

    public get_mouse_intersected_point( 
        camera: THREE.PerspectiveCamera, 
        activeLayers: string[] ): { mousePosition: MousePosition, layerName: string | null, intersect: any[] } {

        // update the picking ray with the camera and pointer position
        this.rayCaster.setFromCamera( this.pointer, camera );

        for( let layerIndex = 0; layerIndex < activeLayers.length; layerIndex++ ){

            const layerName: string = activeLayers[layerIndex];
            const sceneObject = this.scene.getObjectByName(layerName);

            if( !sceneObject || !sceneObject.visible ) continue;

            const intersects = sceneObject ? this.rayCaster.intersectObjects( [sceneObject], false ) : [];
            if( intersects.length > 0 && this.pointerEvent ){

                return {
                    mousePosition: {top: this.pointerEvent.offsetY, left: this.pointerEvent.offsetX},
                    layerName: layerName,
                    intersect: intersects
                }
            }                    
        };

        // returning positions
        return {mousePosition: {top: 0, left: 0}, layerName: null, intersect: []};
        
    }

    public on_pointer_move( event: MouseEvent, canvasContainer: HTMLElement ): void {

        // saving event pointer
        this.pointerEvent = event;
        
        // Ref: https://discourse.threejs.org/t/custom-canvas-size-with-orbitcontrols-and-raycaster/18742
        const rect = canvasContainer.getBoundingClientRect();
        this.pointer.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
        this.pointer.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

    }

    public set_scene_events( canvasContainer: HTMLElement ): void {
        canvasContainer.addEventListener('pointermove', (event) => { this.on_pointer_move( event, canvasContainer)} );
    }
    

}