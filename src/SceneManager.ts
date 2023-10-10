// third party
import * as THREE from 'three';
import { Object3D, Scene } from 'three';
import { Dataset } from './model/Dataset';
import { SceneHighlights } from './model/highlights/Highlights';

export class SceneManager {

    // dataset
    public dataset!: Dataset

    // highlights
    public sceneHighlights!: SceneHighlights;

    constructor( public scene: THREE.Scene, public callbacks: { [name: string]: any }  ){
        this.sceneHighlights = new SceneHighlights();
    }

    public highlight_object( objectType: string, position: number[] | number[][] ): void {
        this.sceneHighlights.highlight_object( objectType, position, this.scene );
    }

    public fire_callback( eventType: 'onHover'|'onClick', objectType: string, objectName: string, index: number, position: number[] ){

        if(eventType in this.callbacks){
            const meta: any = this.dataset.get_object_meta( objectType, objectName, index ) 
            this.callbacks[eventType](index, objectName, position, meta );
        }

    }

    public get_interactive_layers(): string[] {

        if( this.dataset ){

            const layers: string[] = [];
            for (let [key, value] of Object.entries(this.dataset.pointClouds)) {
                if(value.interactive){
                    layers.push(value.name)
                }
            }

            return layers;
        }

        return [];
    }

    public hide_object( name: string, visibility: boolean ){

        const currentObject: THREE.Object3D | undefined = this.scene.getObjectByName( name );
        if( currentObject ){
            currentObject.visible = visibility;
        }
    
    }

    public set_dataset( dataset: Dataset ): void {
        this.dataset = dataset;
    }

    public update( ): void {

        if( this.dataset ){

            // point clouds
            for (let [key, value] of Object.entries(this.dataset.pointClouds)) {
                const currentRenderables: Object3D[] = value.get_renderables()
                currentRenderables.forEach( (renderable: Object3D) => {
                    this.scene.add( renderable );
                })
            }

            // heatmaps
            for (let [key, value] of Object.entries(this.dataset.heatmaps)) {

                const currentRenderables: Object3D[] = value.get_renderables()
                currentRenderables.forEach( (renderable: Object3D) => {
                    this.scene.add( renderable );
                })
            }

        }

    }

}