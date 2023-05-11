// model
import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';

// panels
import { PanelManager } from './model/panels/PanelManager';

export class SceneViewer {

    /*
    *
    *
    * 
    * 
    */

    public dataset!: any;
    public scene!: Scene;

    // panels
    public panelManager!: PanelManager;

    constructor( public containerElement: HTMLDivElement ){

        // Creating options panels
        this.panelManager = new PanelManager( this.containerElement );
        this.panelManager.create_panels();

        // Creating scene
        this.scene = new Scene( this.panelManager.sceneContainer );
    }

    render( dataset: Dataset ){

        this.scene.show( dataset );

    }

}