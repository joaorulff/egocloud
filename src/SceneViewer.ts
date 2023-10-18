// model
import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';

// panels
import { PanelManager } from './model/panels/PanelManager';
import { Line } from './model/interfaces/Line.interface';

export class SceneViewer {

    public dataset!: Dataset;
    public scene!: Scene;

    // panels
    public panelManager!: PanelManager;

    constructor( public containerElement: HTMLDivElement, callbacks: { [name: string]: any } = {} ){

        // // Creating options panels
        this.panelManager = new PanelManager( this.containerElement );
        this.panelManager.create_panels();

        // Creating scene
        this.scene = new Scene( this.panelManager.sceneContainer, callbacks );
    }

    public highlight( objectType: string, position: number[] | Line ): void {
        this.scene.sceneManager.highlight_object( objectType, position );
    }

    public clear_highlights(): void{
        this.scene.sceneManager.clear_highlights();
    }

    public hide( name: string, visible: boolean ){
        this.scene.sceneManager.hide_object( name, visible );
    }

    public set_style( name: string, style: string, value: number ): void {
        this.scene.sceneManager.set_style( name, style, value );
    }

    public render( dataset: Dataset ){

        // clearing scene
        this.scene.clear_scene();

        // rendering
        this.scene.show( dataset );
    }

}