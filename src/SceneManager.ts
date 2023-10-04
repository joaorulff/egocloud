// third party
import * as THREE from 'three';
import { Object3D } from 'three';
import { Dataset } from './model/Dataset';

export class SceneManager {

    constructor( public scene: THREE.Scene ){}

    public hide_object( name: string, visibility: boolean ){

        const currentObject: THREE.Object3D | undefined = this.scene.getObjectByName( name );
        if( currentObject ){
            currentObject.visible = visibility;
        }
    
    }

    public update( dataset: Dataset ): void {

        // point clouds
        for (let [key, value] of Object.entries(dataset.pointClouds)) {
            const currentRenderables: Object3D[] = value.get_renderables()
            currentRenderables.forEach( (renderable: Object3D) => {
                this.scene.add( renderable );
            })
        }

        // heatmaps
        for (let [key, value] of Object.entries(dataset.heatmaps)) {

            const currentRenderables: Object3D[] = value.get_renderables()
            currentRenderables.forEach( (renderable: Object3D) => {

                console.log('Adding heatmap')
                this.scene.add( renderable );
            })
        }

    }

}