// model
import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';

// panels
import { PanelManager } from './model/panels/PanelManager';

export class SceneViewer {

    public dataset!: any;
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

    public highlight_object( objectType: string, position: number[] | number[][] ): void {
        this.scene.sceneManager.highlight_object( objectType, position );
    }

    public hide( name: string, visible: boolean ){
        this.scene.sceneManager.hide_object( name, visible );
    }

    public render( dataset: Dataset ){

        // clearing scene
        this.scene.clear_scene();

        // rendering
        this.scene.show( dataset );
    }


}