// third party
import * as THREE from 'three';
import { Object3D } from 'three';
import { Dataset } from './model/Dataset';
import { SceneHighlights } from './model/highlights/Highlights';
import { Line } from './model/interfaces/Line.interface';
import { SceneStyleManager } from './SceneStyleManager';

export class SceneManager {

    // dataset
    public dataset!: Dataset

    // helpers
    public sceneHighlights!: SceneHighlights;
    public sceneStyleManager!: SceneStyleManager;

    // TODO: saving latest position to avoid firing the callback many timest
    public latestCallbackIndex: number = 0;

    constructor( public scene: THREE.Scene, public callbacks: { [name: string]: any }  ){
        this.sceneHighlights = new SceneHighlights();
        this.sceneStyleManager = new SceneStyleManager();
    }

    public highlight_object( objectType: string, position: number[] | Line ): void {
        this.sceneHighlights.highlight_object( objectType, position, this.scene );
    }

    public clear_highlights(): void {
        this.sceneHighlights.clear_current_highlight( this.scene );
    }

    public fire_callback( eventType: 'onHover' | 'onClick', objectType: string, objectName: string, index: number, position: number[] ){

        if(eventType in this.callbacks){

            if( this.latestCallbackIndex !== index ){
                this.latestCallbackIndex = index;
                const meta: any = this.dataset.get_object_meta( objectType, objectName, index );
                this.callbacks[eventType]( index, objectName, position, meta );
            }

        }

    }

    public get_interactive_layers(): string[] {

        if( this.dataset ){

            const layers: string[] = [];
            for (let [key, value] of Object.entries(this.dataset.pointClouds)) {
                if(value.interactive){
                    layers.push(value.name);
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

    public set_style( name: string, style: string, value: number ): void {
        this.sceneStyleManager.change_style( name, style, value, this.scene );
    }

    public set_dataset( dataset: Dataset ): void {
        this.dataset = dataset;
    }

    public update(): void {

        if( this.dataset ){ 

            // point clouds
            for (let [key, value] of Object.entries(this.dataset.pointClouds)) {
                const currentRenderable: Object3D = value.get_renderables();
                this.scene.add( currentRenderable );

                const box = new THREE.BoxHelper( currentRenderable, '#000000' );
                box.name = `${key}-boundingbox`
                this.dataset.boundingBoxes[`${key}-boundingbox`] = box;
                this.scene.add( box );
            }

            // lines
            for (let [key, value] of Object.entries(this.dataset.lineSets)) {
                const currentRenderable: Object3D = value.get_renderables();
                this.scene.add( currentRenderable );
            }

            // heatmaps
            for (let [key, value] of Object.entries(this.dataset.heatmaps)) {
                const currentRenderable: Object3D = value.get_renderables();
                this.scene.add( currentRenderable );
            }

        }

    }

}